import { ImagePickerAsset } from "expo-image-picker";
import axios, { Method } from "axios";
import {
  AllowedEndpoints,
  RequestArgs,
  generateUrl,
  prepareImageData,
  imageGetter,
} from "~/lib/requestHelpers";
import { z } from "zod";
import { EventCreateSchema } from "../../../shared/zodSchemas";

/**
 * Performs an HTTP request to a specified endpoint using the provided method and options.
 * This function centralizes request handling, including URL generation and optional parameter inclusion.
 *
 * @param method - The HTTP method to be used for the request (e.g., GET, POST).
 * @param endpoint - The API endpoint to which the request will be sent. Must be one of the allowed endpoints.
 * @param options - Optional. An object containing any of the following request customizations:
 *                  - body: The data to be sent in the request body (for methods like POST or PUT).
 *                  - headers: An object representing HTTP headers to include in the request.
 *                  - params: An object representing additional URL parameters to be included in the request.
 * @returns A promise that resolves with the response data from the request.
 */
const CBRequest = async (
  method: Method,
  endpoint: AllowedEndpoints,
  options: RequestArgs = {},
) => {
  // Extend any provided headers with a testing-related header (should be removed in production).
  const headers = {
    ...options.headers,
    "ngrok-skip-browser-warning": "skip", // Indicate this is for bypassing specific ngrok warnings during development/testing.
  };

  // Generate the full URL with any necessary parameter substitutions.
  const url = generateUrl(endpoint, options.params);

  // Execute the HTTP request using axios and return the response data.
  try {
    const response = await axios({
      method,
      url,
      headers: headers,
      data: options.body,
      params: options.params,
    });

    return response.data;
  } catch (error) {
    console.error("Error during HTTP request:", error);
    throw error;
  }
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

export { uploadImageRequest, CBRequest };
