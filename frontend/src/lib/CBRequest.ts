import axios from "axios";
import { BACKEND_URL, ENV } from "@env";

// Define the array of allowed endpoints
const allowedEndpoints = ["/Test"] as const;
type AllowedEndpoints = (typeof allowedEndpoints)[number];

interface RequestArgs {
  body?: any;
  headers?: Record<string, string>;
}

const postRequest = async (
  endpoint: AllowedEndpoints,
  options: RequestArgs,
) => {
  if (ENV === "dev") {
    options.headers = {
      ...options.headers,
      "ngrok-skip-browser-warning": "skip",
    };
  }

  const url = `${BACKEND_URL}${endpoint}`;

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

  const url = `${BACKEND_URL}${endpoint}`;
  const { headers } = options;

  const response = await axios.get(url, { headers });
  return response.data;
};

export { postRequest, getRequest };
