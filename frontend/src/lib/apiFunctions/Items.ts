import {
  MarketPlaceItem,
  MarketPlaceItemResponse,
} from "~/types/MarketPlaceItem";
import { ImagePickerAsset } from "expo-image-picker";
import { CBRequest, uploadImagesRequest } from "~/lib/CBRequest";

export const createMarketPlaceItem = async (
  item: MarketPlaceItem,
  images: ImagePickerAsset[],
): Promise<any> => {
  return await uploadImagesRequest("post", "/api/item/", images, {
    body: item,
  });
};

export const getMarketPlaceItems = async () => {
  try {
    return (await CBRequest("GET", "/api/item/")).data;
  } catch (err) {
    console.log(err);
  }
};

export const getMarketPlaceItem = async (id: string) => {
  try {
    return (
      await CBRequest("GET", "/api/item/:id", {
        params: {
          id,
        },
      })
    ).data;
  } catch (err) {
    console.log(err);
  }
};
