import { BACKEND_URL, ENV } from "@env";
import { ImagePickerAsset } from "expo-image-picker";
import { Platform } from "react-native";
import axios, { Method } from "axios";
import imageGetter from "~/lib/imageGetter";
import { z } from "zod";
import { EventCreateSchema } from "../../../shared/zodSchemas";

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

  // Organization-related endpoints
  "/api/orgs/test",
  "/api/orgs/",

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

  // Miscellaneous endpoints
  "/Test",
  "/api/upload",
  "/api/user/verify",
  "/api/user/token", // TODO - Remove this endpoint - for testing only
] as const;

// Type alias for allowed endpoints to restrict function parameters to valid endpoints
export type AllowedEndpoints = (typeof allowedEndpoints)[number];

// Interface for common request parameters
export interface RequestArgs {
  body?: any;
  headers?: Record<string, string>;
  params?: Record<string, string | number>;
}

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

// Unified request function that can handle any HTTP method and incorporates auth token handling and URL generation
const makeRequest = async (
  method: Method,
  endpoint: AllowedEndpoints,
  options: RequestArgs = {},
) => {
  const headers = {
    ...options.headers,
    "ngrok-skip-browser-warning": "skip", // TODO REMOVE THIS LINE AFTER -- THIS IS FOR TESTING PURPOSES ONLY
  };

  const url = generateUrl(endpoint, options.params);

  // Making the request based on the method and provided data
  const response = await axios({
    method,
    url,
    headers: headers,
    data: options.body,
    params: options.params,
  });

  return response.data;
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
 * Uploads an image by making either a POST or PATCH request to the specified endpoint.
 *
 * @param method - The HTTP method to use ("post" or "patch").
 * @param endpoint - The API endpoint to call.
 * @param selectedImage - The image selected by the user.
 * @param data - Additional data to be sent with the image.
 * @param options - Request configuration, including URL parameters.
 */
const uploadImageRequest = async (
  method: "post" | "patch",
  endpoint: AllowedEndpoints,
  selectedImage: ImagePickerAsset,
  data: Record<string, any>,
  options: RequestArgs,
) => {
  try {
    const formData = prepareImageData(selectedImage, data);
    const url = generateUrl(endpoint, options.params);
    const response = await axios({
      method,
      url,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });
    alert("Image Uploaded Successfully!");
    return response;
  } catch (err) {
    console.error(err);
    alert("Something went wrong in the Upload Function!");
  }
};

const sampleUsages = async () => {
  const pickImage = async () => {
    const result = await imageGetter();

    if (result.canceled) {
      return;
    }

    type EventCreateType = z.infer<typeof EventCreateSchema>;

    const data: EventCreateType = {
      title: "Test Event NEW",
      description: "Test Description",
      location: "Test Location",
      startTime: new Date(2025, 1, 2024, 1),
      endTime: new Date(2025, 1, 2024, 4),
      isPublic: true,
    };
    await uploadImageRequest(
      "post",
      "/api/events/",
      result.assets[0],
      data,
      {},
    );
  };
};

export { uploadImageRequest, makeRequest, generateUrl };
