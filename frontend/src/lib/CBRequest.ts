import axios from "axios";
import { BACKEND_URL, ENV } from "@env";
import { ImagePickerAsset } from "expo-image-picker";
import { Platform } from "react-native";

// Define the array of allowed endpoints
const allowedEndpoints = [
  "/Test",
  "/api/upload",
  "/api/events/test",
  "/api/events/",
  "/api/events/verified",
  "/api/events/organization/:id",
  "/api/events/recent/",
  "/api/events/:id",
  "/api/institution/createInstitution",
  "/api/institution/getInstitutionByID",
  "/api/institution/getInstitutionByName",
  "/api/institution/removeInstitutionByID",
  "/api/institution/getAllInstitutions",
  "/api/orgs/test",
  "/api/orgs/",
  "/api/user/createNewUser",
  "/api/user/resendOTP",
  "/api/user/verifyOTP",
  "/api/user/loginUser",
  "/api/user/logoutUser",
  "/api/user/resetPassword",
  "/api/user/removeUser/:id",
  "/api/user/getAllUsers",
  "/api/user/updateUser/:id",
] as const;
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
  const ext = match?.[1] ?? "";
  const type = `image/${ext}`;

  const formData = new FormData();
  formData.append("file", { uri, name: `image.${ext}`, type } as any);
  Object.entries(data).forEach(([key, value]) => {
    // if the value is a date object than convert it to a string
    if (value instanceof Date) {
      value = value.toISOString();
    }
    formData.append(key, value);
  });
  return formData;
};

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

export { postRequest, getRequest, uploadImageRequest };
