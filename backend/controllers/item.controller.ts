import { AppPermissionName } from "@prisma/client";
import {
  ItemCreateSchema,
  ItemUpdateSchema,
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

// test Item
export const itemTest = async (req: Request, res: Response) => {
  res.status(200).json({ message: "Item endpoint works" });
};

// Get all Items
export const getAllItems = async (req: RequestExtended, res: Response) => {
  try {
    const allItems = await prisma.item.findMany();
    res.status(200).json({
      message: "All items",
      data: allItems,
    });
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Create new Item
export const createItem = async (
  req: RequestExtended,
  res: Response,
  next: NextFunction,
) => {
  try {
    console.log("req.body", req.body);
    console.log("req.file", req.files);
    return res.status(200).json({ message: "Item created successfully" });
    // const loggedInUserId = req.userId;
    //
    // // Validate the Item data
    // const validatedItemData = ItemCreateSchema.parse(req.body);
    //
    // // Start a transaction
    // const newItem = await prisma.$transaction(async (prisma) => {
    //   const user = await prisma.user.findUnique({
    //     where: {
    //       id: loggedInUserId!,
    //     },
    //   });
    //
    //   if (!user || !user.institutionId) {
    //     throw new AppError(
    //       AppErrorName.NOT_FOUND_ERROR,
    //       `User with id ${loggedInUserId} not found or does not have an institution associated with it.`,
    //       404,
    //       true,
    //     );
    //   }
    //
    //   // create item
    //   return prisma.item.create({
    //     data: {
    //       userId: loggedInUserId!,
    //       institutionId: user.institutionId,
    //       title: validatedItemData.title,
    //       description: validatedItemData.description,
    //       price: validatedItemData.price,
    //       condition: validatedItemData.condition,
    //     },
    //   });
    // });
    //
    // if (newItem) {
    //   // Item created successfully
    //   res.status(201).json({
    //     message: "Item created successfully",
    //     data: newItem,
    //   });
    // } else {
    //   // Throw an error if the item creation returned an empty result
    //   throw new AppError(
    //     AppErrorName.EMPTY_RESULT_ERROR,
    //     "Item creation returned empty result.",
    //     500,
    //     true,
    //   );
    // }
  } catch (error: any) {
    // hand error over to error handling middleware
    next(error);
  }
};

// Update Item
export const updateItem = async (
  req: RequestExtended,
  res: Response,
  next: NextFunction,
) => {
  try {
    const loggedInUserId = req.userId;

    // Validate request id param
    const itemId = IdParamSchema.parse(req.params).id;

    // Validate item data
    const validatedUpdateItemData = ItemUpdateSchema.parse(req.body);

    // get the item from the database
    const existingItem = await prisma.item.findUnique({
      where: {
        id: itemId,
      },
    });
    if (!existingItem) {
      throw new AppError(
        AppErrorName.NOT_FOUND_ERROR,
        `Item with id ${itemId} not found`,
        404,
        true,
      );
    }

    // Check if the user has permission to update the item details
    const isCreatedByUser: boolean = existingItem.userId === loggedInUserId;

    if (!isCreatedByUser) {
      throw new AppError(
        AppErrorName.PERMISSION_ERROR,
        `User does not have permission to update post`,
        403,
        true,
      );
    }

    if (req.file) {
      // update the file
      if (existingItem?.image) {
        await deleteFromS3(existingItem.image);
      }
      const uniqueFileName = generateUniqueFileName(
        req.file!.originalname,
        itemId,
      );
      const path = `images/post/${uniqueFileName}`;
      await UploadToS3(req.file!, path);
      validatedUpdateItemData.image = path;
    }

    // Update the item
    const updatedItem = await prisma.item.update({
      where: { id: itemId },
      data: {
        ...validatedUpdateItemData,
      },
    });
    // send back the updated item
    if (updatedItem) {
      // Item updated successfully
      res.status(200).json({
        message: "Item updated successfully",
        data: updatedItem,
      });
    } else {
      throw new AppError(
        AppErrorName.EMPTY_RESULT_ERROR,
        "Item update returned empty result.",
        500,
        true,
      );
    }
  } catch (error: any) {
    next(error);
  }
};

// Delete Item
export const deleteItem = async (
  req: RequestExtended,
  res: Response,
  next: NextFunction,
) => {
  try {
    const loggedInUserId = req.userId;

    // Validate request id param
    const itemId = IdParamSchema.parse(req.params).id;

    // get the item from the database
    const existingItem = await prisma.item.findUnique({
      where: {
        id: itemId,
      },
    });

    if (!existingItem) {
      throw new AppError(
        AppErrorName.NOT_FOUND_ERROR,
        "Item not found",
        404,
        true,
      );
    }
    // Check if the user is the item's creator
    const isCreatedByUser: boolean = existingItem.userId === loggedInUserId;

    // Check if the user is the item creator
    if (isCreatedByUser) {
      // Delete the item
      await prisma.item.delete({
        where: { id: itemId },
      });
    } else {
      console.error(
        `User with userId: ${loggedInUserId} does not have permission to delete the item with itemId: ${itemId}`,
      );
      throw new AppError(
        AppErrorName.PERMISSION_ERROR,
        `User does not have permission to delete item`,
        403,
        true,
      );
    }
  } catch (error: any) {
    next(error);
  }
};
