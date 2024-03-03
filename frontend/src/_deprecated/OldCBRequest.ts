import { AllowedEndpoints, generateUrl, RequestArgs } from "~/lib/CBRequest";
import { ENV } from "@env";
import axios from "axios";

/**
 * Performs a POST request to the specified endpoint.
 *
 * @param endpoint - The API endpoint to call.
 * @param options - Request configuration, including body, headers, and URL parameters.
 * @return The data from the response.
 */
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

/**
 * Performs a GET request to the specified endpoint.
 *
 * @param endpoint - The API endpoint to call.
 * @param options - Request configuration, including headers and URL parameters.
 * @return The data from the response.
 */
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

/**
 * Demonstrates the usage of getRequest and postRequest functions.
 *
 * This function first fetches user details using a GET request and then updates
 * the user information using a POST request.
 */
async function demoApiRequests() {
  const testCallback = async () => {
    await getRequest("/Test", {})
      .then((response) => response)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  };

  const testCallback2 = async () => {
    try {
      // Define user ID for demo purposes
      const userId = 123;

      // Fetch user details using a GET request
      console.log(`Fetching details for user ${userId}...`);
      const userDetails = await getRequest("/api/user/getAllUsers", {
        params: { id: userId },
      });
      console.log("User Details:", userDetails);

      // Prepare new user details for updating
      const updatedUserDetails = {
        name: "John Doe",
        email: "john.doe@example.com",
      };

      // Update user information using a POST request
      console.log(`Updating details for user ${userId}...`);
      const updateResponse = await postRequest("/api/user/updateUser/:id", {
        body: updatedUserDetails,
        params: { id: userId },
      });
      console.log("Update Response:", updateResponse);

      console.log("Demo completed successfully.");
    } catch (error) {
      console.error("Error during API request demo:", error);
    }
  };
}
