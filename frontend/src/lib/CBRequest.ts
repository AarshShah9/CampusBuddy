import { ImagePickerAsset } from "expo-image-picker";
import axios, { Method } from "axios";
import {
  AllowedEndpoints,
  generateUrl,
  IdAndBodyRequiredEndpointOptions,
  IdAndBodyRequiredEndPoints,
  IdRequiredEndpointOptions,
  IdRequiredEndPoints,
  NonIdRequiredEndPoints,
  prepareImageData,
  prepareImagesData,
  RequestArgs,
} from "~/lib/requestHelpers";

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
export async function CBRequest(
  method: Method,
  endpoint: NonIdRequiredEndPoints,
  options?: RequestArgs,
): Promise<any>;
export async function CBRequest(
  method: Method,
  endpoint: IdRequiredEndPoints,
  options: IdRequiredEndpointOptions,
): Promise<any>;
export async function CBRequest(
  method: Method,
  endpoint: IdAndBodyRequiredEndPoints,
  options: IdAndBodyRequiredEndpointOptions,
): Promise<any>;

export async function CBRequest(
  method: Method,
  endpoint: AllowedEndpoints,
  options: RequestArgs = {},
) {
  // TODO Extend any provided headers with a testing-related header (should be removed in production).
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
}

/**
 * Uploads an image by making either a POST or PATCH request to the specified endpoint.
 *
 * @param method - The HTTP method to use ("post" or "patch").
 * @param endpoint - The API endpoint to call.
 * @param selectedImage - The image selected by the user.
 * @param data - Additional data to be sent with the image.
 * @param options - Request configuration, including URL parameters.
 */
export async function uploadImageRequest(
  method: "post" | "patch",
  endpoint: AllowedEndpoints,
  selectedImage: ImagePickerAsset,
  options: RequestArgs,
) {
  try {
    const formData = prepareImageData(selectedImage, options.body);
    const url = generateUrl(endpoint, options.params);
    return await axios({
      method,
      url,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function uploadImagesRequest(
  method: "post" | "patch",
  endpoint: AllowedEndpoints,
  selectedImages: ImagePickerAsset[],
  options: RequestArgs,
) {
  try {
    const formData = prepareImagesData(selectedImages, options.body);
    const url = generateUrl(endpoint, options.params);
    return await axios({
      method,
      url,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
}
