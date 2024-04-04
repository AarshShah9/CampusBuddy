import * as ImagePicker from "expo-image-picker";
import { ImagePickerAsset } from "expo-image-picker";
import { BACKEND_URL } from "@env";
import { Platform } from "react-native";

const imageGetter = async () => {
  return await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });
};

const imageGetterV2 = async ({
  circle = false,
  multiple = false,
  allowEditing = false,
  maxSize = 10,
} = {}) => {
  const aspectRatio: [number, number] = circle ? [1, 1] : [4, 3];
  if (multiple) allowEditing = false;

  return await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: allowEditing,
    aspect: aspectRatio,
    quality: 1,
    allowsMultipleSelection: multiple,
    selectionLimit: multiple ? maxSize : 1,
  });
};

/**
 * Prepares the image data for uploading by creating a FormData object.
 *
 * @param selectedImage - The image selected by the user.
 * @param data - Additional data to be sent with the image.
 * @return The FormData object containing the image and additional data.
 */
const prepareImageData = (
  selectedImage: ImagePickerAsset,
  data: Record<string, any>,
): FormData => {
  const uri =
    Platform.OS === "android"
      ? selectedImage.uri
      : selectedImage.uri.replace("file://", "");
  const filename = selectedImage.uri.split("/").pop();
  const match = /\.(\w+)$/.exec(filename as string);
  const type = `image/${match ? match[1] : ""}`;

  const formData = new FormData();
  formData.append("file", {
    uri,
    name: `image.${match ? match[1] : ""}`,
    type,
  } as any);
  Object.entries(data).forEach(([key, value]) => {
    if (value instanceof Date) value = value.toISOString();
    formData.append(key, value);
  });
  return formData;
};

/**
 * Prepares the image data for uploading by creating a FormData object.
 *
 * @param selectedImages - The images selected by the user.
 * @param data - Additional data to be sent with the images.
 * @return The FormData object containing the images and additional data.
 */
const prepareImagesData = (
  selectedImages: ImagePickerAsset[],
  data: Record<string, any>,
): FormData => {
  const formData = new FormData();

  selectedImages.forEach((selectedImage, index) => {
    const uri =
      Platform.OS === "android"
        ? selectedImage.uri
        : selectedImage.uri.replace("file://", "");
    const filename = selectedImage.uri.split("/").pop();
    const match = /\.(\w+)$/.exec(filename as string);
    const type = `image/${match ? match[1] : "jpeg"}`;

    formData.append("file", {
      uri,
      name: `image${index + 1}.${match ? match[1] : "jpeg"}`,
      type,
    } as any);
  });

  Object.entries(data).forEach(([key, value]) => {
    if (value instanceof Date) {
      value = value.toISOString();
    }
    formData.append(key, value);
  });

  return formData;
};
// List of allowed API endpoints to ensure valid endpoint usage in requests
const allowedEndpoints = [
  // User-related endpoints
  "/api/user/createNewUser",
  "/api/user/resendOTP",
  "/api/user/verifyOTP",
  "/api/user/loginUser",
  "/api/user/logoutUser",
  "/api/user/resetPassword",
  "/api/user/removeUser/:id",
  "/api/user/getAllUsers",
  "/api/user/updateUser/:id",
  "/api/user/profilePicture",
  "/api/user/deleteProfilePicture",
  "/api/user/student",
  "/api/user/organization/new",
  "/api/user/profile",

  // Organization-related endpoints
  "/api/orgs/test",
  "/api/orgs/",
  "/api/orgs/deleteProfilePicture/:id",
  "/api/orgs/profilePicture/:id",

  // Institution-related endpoints
  "/api/institution/createInstitution",
  "/api/institution/getInstitutionByID",
  "/api/institution/getInstitutionByName",
  "/api/institution/removeInstitutionByID",
  "/api/institution/getAllInstitutions",

  // Event-related endpoints
  "/api/events/test",
  "/api/events/",
  "/api/events/verified",
  "/api/events/organization/:id",
  "/api/events/recent/",
  "/api/events/:id",
  "/api/events/mainPage",
  "/api/events/mapEvents",
  "/api/events/like/:id",
  "/api/events/attendees/:id",
  "/api/events/attend/:id",

  // Post-related endpoints
  "/api/post/test",
  "/api/post/",
  "/api/item/",
  "/api/item/:id",
  "/api/post/:id",
  "/api/post/comments/:id",

  // profile related endpoints
  "/api/profile/saved",
  "/api/profile/user/:id",
  "/api/profile/events/:id",
  "/api/profile/posts/:id",
  "/api/profile/items/:id",

  // Miscellaneous endpoints
  "/Test",
  "/api/upload",
  "/api/user/verify",
  "/api/user/token", // TODO - Remove this endpoint - for testing only
  "/api/notification/storePushToken",
  "/api/search/",
] as const;

// Type alias for allowed endpoints to restrict function parameters to valid endpoints
export type AllowedEndpoints = (typeof allowedEndpoints)[number];

// Interface for common request parameters
interface RequestArgs {
  body?: any;
  headers?: Record<string, string>;
  params?: Record<string, string | number>;
}

export type IdRequiredEndPoints =
  | "/api/user/removeUser/:id"
  | "/api/user/updateUser/:id"
  | "/api/events/organization/:id"
  | "/api/events/:id"
  | "/api/events/like/:id"
  | "/api/events/attendees/:id"
  | "/api/profile/user/:id"
  | "/api/profile/events/:id"
  | "/api/profile/posts/:id"
  | "/api/item/:id"
  | "/api/post/:id"
  | "/api/post/comments/:id"
  | "/api/orgs/deleteProfilePicture/:id"
  | "/api/profile/items/:id";

export type IdRequiredEndpointOptions = Omit<RequestArgs, "body" | "params"> & {
  params: { id: string };
};

export type NonIdRequiredEndPoints = Exclude<
  AllowedEndpoints,
  IdRequiredEndPoints
>;

/**
 * Generates a complete URL by appending the endpoint to the BACKEND_URL and
 * interpolating any parameters into the endpoint string.
 *
 * @param endpoint - The API endpoint to call.
 * @param params - Optional parameters to replace in the endpoint string.
 * @return The fully constructed URL.
 */
const generateUrl = (
  endpoint: AllowedEndpoints,
  params?: Record<string, string | number>,
): string => {
  let url = `${BACKEND_URL}${endpoint}`;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url = url.replace(`:${key}`, encodeURIComponent(value.toString()));
    });
  }
  return url;
};

export {
  imageGetter,
  prepareImageData,
  RequestArgs,
  generateUrl,
  ImagePicker,
  imageGetterV2,
  allowedEndpoints,
  prepareImagesData,
};
