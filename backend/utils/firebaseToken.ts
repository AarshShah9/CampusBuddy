import * as admin from "firebase-admin";

export const generateFirebaseCustomToken = async (userId: string) => {
  try {
    // Generate the custom token using Firebase Admin SDK
    const customToken = await admin.auth().createCustomToken(userId);
    return customToken;
  } catch (error) {
    console.error("Error creating custom token:", error);
  }
};
