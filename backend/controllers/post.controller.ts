import { AppPermissionName, PostType } from "@prisma/client";
import {
  PostCreateSchema,
  PostUpdateSchema,
  IdParamSchema,
  CommentCreateSchema,
  CommentParamsSchema,
} from "../../shared/zodSchemas";
import { NextFunction, Request, Response } from "express";
import prisma from "../prisma/client";
import { AppError, AppErrorName } from "../utils/AppError";
import { checkUserPermission } from "../utils/checkUserPermission";
import UploadToS3, {
  deleteFromS3,
  generateUniqueFileName,
} from "../utils/S3Uploader";
import { RequestExtended } from "../middleware/verifyAuth";
import { moderateText } from "../utils/moderateText";
import { emailPostFlagged } from "../utils/emails";
import {
  addPostAttendance,
  removePostAttendance,
} from "../services/post.service";

// test Post
export const postTest = async (req: Request, res: Response) => {
  res.status(200).json({ message: "Post endpoint works" });
};

// Get all Posts
export const getAllPosts = async (
  req: RequestExtended,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.userId;

    const user = await prisma.user.findUnique({
      where: {
        id: userId!,
      },
    });

    if (!user) {
      throw new AppError(
        AppErrorName.NOT_FOUND_ERROR,
        `User with id ${userId} not found.`,
        404,
        true,
      );
    }

    const allPosts = await prisma.post.findMany({
      where: {
        institutionId: user.institutionId!,
        isPublic: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    res.status(200).json({
      message: "All posts",
      data: [
        ...allPosts.map((post) => {
          return {
            id: post.id,
            title: post.title,
            description: post.description,
            spotsLeft: post.numberOfSpotsLeft,
            expiresAt: post.expiresAt,
          };
        }),
      ],
    });
  } catch (error) {
    // hand error over to error handling middleware
    next(error);
  }
};

// Create new Post
export const createLookingForPost = async (
  req: RequestExtended,
  res: Response,
  next: NextFunction,
) => {
  try {
    const loggedInUserId = req.userId;

    // Validate the Post data
    const validatedPostData = PostCreateSchema.parse(req.body);

    // Start a transaction
    const newPost = await prisma.$transaction(async (prisma) => {
      const user = await prisma.user.findUnique({
        where: {
          id: loggedInUserId!,
        },
      });

      if (!user || !user.institutionId) {
        throw new AppError(
          AppErrorName.NOT_FOUND_ERROR,
          `User with id ${loggedInUserId} not found or does not have an institution associated with it.`,
          404,
          true,
        );
      }

      // run moderation check
      const isFlagged = await moderateText(
        validatedPostData.title,
        validatedPostData.description,
      );

      // create post
      const createdPost = await prisma.post.create({
        data: {
          userId: loggedInUserId!,
          institutionId: user.institutionId,
          title: validatedPostData.title,
          description: validatedPostData.description,
          isPublic: !isFlagged,
          isFlagged: isFlagged,
          expiresAt: validatedPostData.expiresAt,
          type: PostType.LookingFor,
          numberOfSpots: validatedPostData.numberOfSpots,
          numberOfSpotsLeft: validatedPostData.numberOfSpots,
        },
      });

      if (isFlagged) {
        await emailPostFlagged(user, createdPost);
      }

      return createdPost;
    });

    if (newPost) {
      // Post created successfully
      res.status(201).json({
        message: "Post created successfully",
        data: newPost,
      });
    } else {
      // Throw an error if the post creation returned an empty result
      throw new AppError(
        AppErrorName.EMPTY_RESULT_ERROR,
        "Post creation returned empty result.",
        500,
        true,
      );
    }
  } catch (error: any) {
    // hand error over to error handling middleware
    next(error);
  }
};

// Update Post
export const updatePost = async (
  req: RequestExtended,
  res: Response,
  next: NextFunction,
) => {
  try {
    const loggedInUserId = req.userId;

    // Validate request id param
    const postId = IdParamSchema.parse(req.params).id;

    // Validate post data
    const validatedUpdatePostData = PostUpdateSchema.parse(req.body);

    // get the post from the database
    const existingPost = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });
    if (!existingPost) {
      throw new AppError(
        AppErrorName.NOT_FOUND_ERROR,
        `Post with id ${postId} not found`,
        404,
        true,
      );
    }

    // Check if the user has permission to update the post details
    const isCreatedByUser: boolean = existingPost.userId === loggedInUserId;
    let hasPermission: boolean = false;

    // Check if there is a group associated with the post data
    if (existingPost.organizationId) {
      // check if the user has permission to update the post
      hasPermission = await checkUserPermission(
        loggedInUserId!,
        existingPost.organizationId,
        AppPermissionName.MANAGE_POSTS,
      );
    }

    if (!hasPermission && !isCreatedByUser) {
      throw new AppError(
        AppErrorName.PERMISSION_ERROR,
        `User does not have permission to update post`,
        403,
        true,
      );
    }

    if (req.file) {
      // update the file
      if (existingPost?.image) {
        await deleteFromS3(existingPost.image);
      }
      const uniqueFileName = generateUniqueFileName(
        req.file!.originalname,
        postId,
      );
      const path = `images/post/${uniqueFileName}`;
      await UploadToS3(req.file!, path);
      validatedUpdatePostData.image = path;
    }

    // Update the post
    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: {
        ...validatedUpdatePostData,
      },
    });
    // send back the updated post
    if (updatedPost) {
      // Post updated successfully
      res.status(200).json({
        message: "Post updated successfully",
        data: updatedPost,
      });
    } else {
      throw new AppError(
        AppErrorName.EMPTY_RESULT_ERROR,
        "Post update returned empty result.",
        500,
        true,
      );
    }
  } catch (error: any) {
    next(error);
  }
};

// Delete post
export const deletePost = async (
  req: RequestExtended,
  res: Response,
  next: NextFunction,
) => {
  try {
    const loggedInUserId = req.userId;

    // Validate request id param
    const postId = IdParamSchema.parse(req.params).id;

    // get the post from the database
    const existingPost = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!existingPost) {
      throw new AppError(
        AppErrorName.NOT_FOUND_ERROR,
        "Event not found",
        404,
        true,
      );
    }

    // Check if the user is the post's creator
    const isCreatedByUser: boolean = existingPost.userId === loggedInUserId;

    // Check if there is a group associated with the post data
    if (existingPost.organizationId) {
      // check if the user has permission to delete the post
      const hasPermission = await checkUserPermission(
        loggedInUserId!,
        existingPost.organizationId,
        AppPermissionName.MANAGE_POSTS,
      );

      // Check if the user has permission to manage posts or if they are the post creator
      if (hasPermission || isCreatedByUser) {
        // Delete the post
        await prisma.post.delete({
          where: { id: postId },
        });
      } else {
        console.error(
          `User with userId: ${loggedInUserId} does not have permission to delete the post with postId: ${postId}`,
        );

        throw new AppError(
          AppErrorName.PERMISSION_ERROR,
          `User does not have permission to delete post`,
          403,
          true,
        );
      }
      // Post not associated with an organization, check if user is the one who created the post
    } else if (isCreatedByUser) {
      // Delete the post
      await prisma.post.delete({
        where: { id: postId },
      });
    } else {
      console.error(
        `User with userId: ${loggedInUserId} does not have permission to delete the post with postId: ${postId}`,
      );

      throw new AppError(
        AppErrorName.PERMISSION_ERROR,
        `User does not have permission to delete post`,
        403,
        true,
      );
    }
    res.status(204).end();
  } catch (error: any) {
    next(error);
  }
};

export const getPostById = async (
  req: RequestExtended,
  res: Response,
  next: NextFunction,
) => {
  try {
    const postId = IdParamSchema.parse(req.params).id;

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        user: true,
      },
    });

    if (!post) {
      throw new AppError(
        AppErrorName.NOT_FOUND_ERROR,
        `Post with id ${postId} not found`,
        404,
        true,
      );
    }

    const self: boolean = req.userId === post.userId;

    if (!post.isPublic && !self) {
      throw new AppError(
        AppErrorName.PERMISSION_ERROR,
        `User does not have permission to view post`,
        403,
        true,
      );
    }

    // is attending the post
    const isAttending = await prisma.postAttendance.findUnique({
      where: {
        postId_userId: {
          postId: post.id,
          userId: req.userId!,
        },
      },
    });

    const postResponse = {
      id: post.id,
      title: post.title,
      description: post.description,
      spotsLeft: post.numberOfSpotsLeft,
      createdAt: post.createdAt,
      userId: post.userId,
      userName: post.user.firstName + " " + post.user.lastName,
      userImage: post.user.profilePic,
      isFlagged: post.isFlagged,
      self: self,
      isAttending,
    };

    res.status(200).json({
      message: "Post found",
      data: postResponse,
    });
  } catch (error: any) {
    next(error);
  }
};

export const getPostCommentsById = async (
  req: RequestExtended,
  res: Response,
  next: NextFunction,
) => {
  try {
    const postId = IdParamSchema.parse(req.params).id;

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        comments: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!post) {
      throw new AppError(
        AppErrorName.NOT_FOUND_ERROR,
        `Post with id ${postId} not found`,
        404,
        true,
      );
    }

    const postComments = post.comments.map((comment) => {
      return {
        id: comment.id,
        content: comment.content,
        createdAt: comment.createdAt,
        userId: comment.userId,
        userName: comment.user.firstName + " " + comment.user.lastName,
        userImage: comment.user.profilePic,
      };
    });

    res.status(200).json({
      message: "Post comments found",
      data: postComments,
    });
  } catch (error: any) {
    next(error);
  }
};

// create a new comment on a post
export const createPostComment = async (
  req: RequestExtended,
  res: Response,
  next: NextFunction,
) => {
  try {
    const postId = IdParamSchema.parse(req.params).id;
    // Validate that the comment has a message
    let { content } = CommentCreateSchema.parse(req.body);
    const loggedInUserId = req.userId;

    const newComment = await prisma.comment.create({
      data: {
        userId: loggedInUserId!,
        postId,
        content,
      },
    });

    if (!newComment) {
      throw new AppError(
        AppErrorName.EMPTY_RESULT_ERROR,
        "Comment creation returned empty result.",
        500,
        true,
      );
    }

    res.status(201).json({
      message: "Comment created successfully",
      data: newComment,
    });
  } catch (error: any) {
    next(error);
  }
};

// Update a comment
export const updatePostComment = async (
  req: RequestExtended,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { postId, commentId } = CommentParamsSchema.parse(req.params);

    // Validate that the comment has a message
    let { content } = CommentCreateSchema.parse(req.body);
    const loggedInUserId = req.userId;

    // get the comment from the database
    const existingComment = await prisma.comment.findUnique({
      where: {
        id: commentId,
      },
      select: { userId: true },
    });

    if (!existingComment) {
      throw new AppError(
        AppErrorName.NOT_FOUND_ERROR,
        `Comment not found`,
        404,
        true,
      );
    }

    // Check if the user has permission to update the comment
    if (existingComment.userId !== loggedInUserId) {
      throw new AppError(
        AppErrorName.PERMISSION_ERROR,
        `You do not have permission to edit this comment`,
        403,
        true,
      );
    }

    // Create a new comment
    const newComment = await prisma.comment.update({
      where: {
        id: commentId,
      },
      data: {
        content,
      },
    });

    if (!newComment) {
      throw new AppError(
        AppErrorName.EMPTY_RESULT_ERROR,
        "Comment update returned empty result.",
        500,
        true,
      );
    }

    res.status(201).json({
      message: "Comment updated successfully",
      data: newComment,
    });
  } catch (error: any) {
    next(error);
  }
};

// Delete a comment
export const deletePostComment = async (
  req: RequestExtended,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { postId, commentId } = CommentParamsSchema.parse(req.params);
    const loggedInUserId = req.userId;

    // get the comment from the database
    const existingComment = await prisma.comment.findUnique({
      where: {
        id: commentId,
      },
      select: { userId: true },
    });

    if (!existingComment) {
      throw new AppError(
        AppErrorName.NOT_FOUND_ERROR,
        `Comment not found`,
        404,
        true,
      );
    }

    // Check if the user has permission to update the comment
    if (existingComment.userId !== loggedInUserId) {
      throw new AppError(
        AppErrorName.PERMISSION_ERROR,
        `You do not have permission to delete this comment`,
        403,
        true,
      );
    }

    // Delete the comment
    const newComment = await prisma.comment.delete({
      where: {
        id: commentId,
      },
    });

    res.status(204).end();
  } catch (error: any) {
    next(error);
  }
};

// Handles user requests to toggle their attendance to a post
export const toggleJoinLookingFor = async (
  req: RequestExtended,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Validate request post id param
    const postId = IdParamSchema.parse(req.params).id;
    const loggedInUserId = req.userId;

    // Get the post if it exists
    const existingPost = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!existingPost) {
      throw new AppError(
        AppErrorName.NOT_FOUND_ERROR,
        `Post not found`,
        404,
        true,
      );
    }

    // check if the user is already attending
    const attendance = await prisma.postAttendance.findUnique({
      where: {
        postId_userId: {
          postId,
          userId: loggedInUserId!,
        },
      },
    });

    // add users attence to the post
    if (!attendance) {
      const newAttendance = await addPostAttendance(
        loggedInUserId!,
        existingPost,
      );

      res.status(200).json({
        message: `User attendance added to post: ${existingPost.title}`,
      });
    } else {
      // remove the users attendance from the post
      await removePostAttendance(loggedInUserId!, existingPost);

      res.status(200).json({
        message: `User attendance removed from post: ${existingPost.title}`,
      });
    }
  } catch (error) {
    next(error);
  }
};
