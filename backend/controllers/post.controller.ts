import { AppPermissionName, PostType } from "@prisma/client";
import {
  PostCreateSchema,
  PostUpdateSchema,
  IdParamSchema,
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
      return prisma.post.create({
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
        content: comment.text,
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
