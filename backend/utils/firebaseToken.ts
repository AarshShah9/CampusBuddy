import * as admin from "firebase-admin";

export const generateFirebaseCustomToken = async (userId: string) => {
  try {
    // Generate the custom token using Firebase Admin SDK
    return await admin.auth().createCustomToken(userId);
  } catch (error) {
    console.error("Error creating custom token:", error);
  }
};
