import { ItemCreateSchema, IdParamSchema } from "../../shared/zodSchemas";
import { NextFunction, Request, Response } from "express";
import prisma from "../prisma/client";
import { AppError, AppErrorName } from "../utils/AppError";
import UploadToS3, { generateUniqueFileName } from "../utils/S3Uploader";
import { RequestExtended } from "../middleware/verifyAuth";
import {
  getCoordinatesFromPlaceId,
  getPlaceNameFromPlaceId,
} from "../utils/googleMapsApi";
import { State } from "@prisma/client";
import { moderateText } from "../utils/moderateText";
import { emailItemFlagged } from "../utils/emails";

// test Item
export const itemTest = async (req: Request, res: Response) => {
  res.status(200).json({ message: "Item endpoint works" });
};

// Get all Items
export const getAllItems = async (req: RequestExtended, res: Response) => {
  try {
    const allItems = await prisma.item.findMany({
      include: {
        location: true,
      },
    });
    const images = await prisma.image.findMany({
      where: {
        itemId: {
          in: allItems.map((item) => item.id),
        },
      },
      select: {
        url: true,
        itemId: true,
      },
    });

    const items = allItems.map((item) => {
      const itemImages = images.filter((image) => image.itemId === item.id);
      return {
        id: item.id,
        title: item.title,
        price: item.price,
        location: item.location.name,
        image: itemImages[0]?.url,
      };
    });

    res.status(200).json({
      message: "All items",
      data: items,
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
    const files: Express.Multer.File[] = req.files as Express.Multer.File[];
    const loggedInUserId = req.userId;

    // Validate the Item data
    const validatedItemData = ItemCreateSchema.parse(req.body);

    // Start a transaction
    const newItem = await prisma.$transaction(async (prisma) => {
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

      const existingLocation = await prisma.location.findUnique({
        where: {
          placeId: validatedItemData.locationPlaceId,
        },
      });

      if (!existingLocation) {
        const { lat, lng } = await getCoordinatesFromPlaceId(
          validatedItemData.locationPlaceId,
        );
        const name = await getPlaceNameFromPlaceId(
          validatedItemData.locationPlaceId,
        );
        const location = await prisma.location.create({
          data: {
            latitude: lat,
            longitude: lng,
            placeId: validatedItemData.locationPlaceId,
            name: name,
          },
        });
      }

      const isFlagged = await moderateText(
        validatedItemData.title,
        validatedItemData.description,
      );

      // create item
      const newItem = await prisma.item.create({
        data: {
          userId: loggedInUserId!,
          institutionId: user.institutionId,
          title: validatedItemData.title,
          description: validatedItemData.description,
          isPublic: !isFlagged,
          isFlagged: isFlagged,
          price: validatedItemData.price,
          condition: validatedItemData.condition,
          locationPlaceId: validatedItemData.locationPlaceId,
          state: State.Available,
        },
      });

      if (files && files.length) {
        await Promise.all(
          files.map(async (file) => {
            const uniqueFileName = generateUniqueFileName(
              file.originalname,
              newItem.id,
            );
            const path = `images/items/${uniqueFileName}`;
            await UploadToS3(file, path);

            // Create Image object and link it to the item
            await prisma.image.create({
              data: {
                itemId: newItem.id,
                url: path,
              },
            });
          }),
        );
      }

      // Send email to user if item is flagged
      if (isFlagged) {
        await emailItemFlagged(user, newItem);
      }

      return newItem;
    });

    if (newItem) {
      // Item created successfully
      res.status(201).json({
        message: "Item created successfully",
        data: newItem,
      });
    } else {
      // Throw an error if the item creation returned an empty result
      throw new AppError(
        AppErrorName.EMPTY_RESULT_ERROR,
        "Item creation returned empty result.",
        500,
        true,
      );
    }
  } catch (error: any) {
    // hand error over to error handling middleware
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
