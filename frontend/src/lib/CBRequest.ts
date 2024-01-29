import axios from "axios";
import { BACKEND_URL, ENV } from "@env";
import { ImagePickerAsset } from "expo-image-picker";
import { Platform } from "react-native";

// Define the array of allowed endpoints
const allowedEndpoints = ["/Test", "/api/events/organization/:id"] as const;
type AllowedEndpoints = (typeof allowedEndpoints)[number];

interface RequestArgs {
  body?: any;
  headers?: Record<string, string>;
  params?: Record<string, string | number>;
}

const generateUrl = (
  endpoint: AllowedEndpoints,
  params?: Record<string, string | number>,
): string => {
  let url = `${BACKEND_URL}${endpoint}`;

  if (params) {
    for (const [key, value] of Object.entries(params)) {
      url = url.replace(`:${key}`, encodeURIComponent(value.toString()));
    }
  }

  return url;
};

const postRequest = async (
  endpoint: AllowedEndpoints,
  options: RequestArgs,
) => {
  if (ENV === "dev" && options) {
    options.headers = {
      ...options.headers,
      "ngrok-skip-browser-warning": "skip",
    };
  }

  const url = generateUrl(endpoint, options.params);
  const { body, headers } = options;
  const response = await axios.post(url, body, { headers });
  return response.data;
};

const getRequest = async (endpoint: AllowedEndpoints, options: RequestArgs) => {
  if (ENV === "dev") {
    options.headers = {
      ...options.headers,
      "ngrok-skip-browser-warning": "skip",
    };
  }

  const url = generateUrl(endpoint, options.params);
  const { headers } = options;

  const response = await axios.get(url, { headers });
  return response.data;
};

const UploadImageRequest = async (
  endpoint: AllowedEndpoints,
  selectedImage: ImagePickerAsset,
  data: Record<string, any>,
  options: RequestArgs,
) => {
  const uri =
    Platform.OS === "android"
      ? selectedImage.uri
      : selectedImage.uri.replace("file://", "");
  const filename = selectedImage.uri.split("/").pop();
  const match = /\.(\w+)$/.exec(filename as string);
  const ext = match?.[1];
  const type = match ? `image/${match[1]}` : `image`;
  const formData = new FormData();
  formData.append("file", {
    uri,
    name: `image.${ext}`,
    type,
  } as any);

  formData.append("data", JSON.stringify(data));
  const url = generateUrl(endpoint, options.params);
  await axios
    .post(url, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((response) => {
      alert("Image Uploaded Successfully!");
      return response;
    })
    .catch((err) => {
      console.log(err);
      alert("Something went wrong in the Upload Function!");
    });
};

export { postRequest, getRequest, UploadImageRequest };
