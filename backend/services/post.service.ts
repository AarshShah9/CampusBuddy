import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import prisma from "../prisma/client";
import { AppError, AppErrorName } from "../utils/AppError";
import { Post, PostAttendance } from "@prisma/client";

export async function addPostAttendance(userId: string, post: Post) {
  try {
    // Check if the post cannot be joined
    if (post.numberOfSpots && !post.numberOfSpotsLeft) {
      throw new AppError(
        AppErrorName.NO_SPOT_AVAILABLE_ERROR,
        `This post has no available spots to join`,
        400,
        true,
      );
    }
    if (!post.numberOfSpots) {
      throw new AppError(
        AppErrorName.NO_SPOT_AVAILABLE_ERROR,
        `This post cannot be joined`,
        400,
        true,
      );
    }

    let newAttendance: PostAttendance | undefined;
    // start a transaction
    await prisma.$transaction(async (tx) => {
      // add the user's attendance
      newAttendance = await prisma.postAttendance.create({
        data: {
          postId: post.id,
          userId,
        },
      });

      // decrement number of spots available
      await prisma.post.update({
        where: { id: post.id },
        data: {
          numberOfSpotsLeft: { increment: -1 },
        },
      });
    });

    if (!newAttendance) {
      throw new AppError(
        AppErrorName.INTERNAL_SERVER_ERROR,
        `Failed to add user attendance`,
        500,
        true,
      );
    }

    return newAttendance;
  } catch (error: any) {
    if (error instanceof AppError) {
      // rethrow error
      throw error;
    } else if (
      error instanceof PrismaClientKnownRequestError &&
      error.code == "P2002" // unique constraint violation error code
    ) {
      throw new AppError(
        AppErrorName.RECORD_EXISTS_ERROR,
        "User is already attending",
        400,
        true,
      );
    } else {
      throw new AppError(
        AppErrorName.INTERNAL_SERVER_ERROR,
        "An unexpected error occurred adding user attendence",
        500,
        true,
      );
    }
  }
}

export async function removePostAttendance(userId: string, post: Post) {
  try {
    // check if post has attendance fields
    if (!post.numberOfSpots) {
      throw new AppError(
        AppErrorName.NO_SPOT_AVAILABLE_ERROR,
        `This post does not have attendance`,
        400,
        true,
      );
    }

    // start a transaction
    await prisma.$transaction(async (tx) => {
      // remove the user's attendence
      await prisma.postAttendance.delete({
        where: {
          postId_userId: {
            postId: post.id,
            userId,
          },
        },
      });

      // Increment number of spots available
      await prisma.post.update({
        where: { id: post.id },
        data: {
          numberOfSpotsLeft: { increment: 1 },
        },
      });
    });
  } catch (error: any) {
    if (error instanceof AppError) {
      // rethrow error
      throw error;
    } else {
      throw new AppError(
        AppErrorName.INTERNAL_SERVER_ERROR,
        "An unexpected error occurred removing user attendence",
        500,
        true,
      );
    }
  }
}
