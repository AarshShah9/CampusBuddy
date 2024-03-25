import * as Notifications from "expo-notifications";
import { CBRequest } from "../CBRequest";

export const storeUserPushToken = async (
  token: Notifications.ExpoPushToken,
) => {
  try {
    return await CBRequest("POST", "/api/notification/storePushToken", {
      body: { pushToken: token.data },
    });
  } catch (err) {
    console.log(err);
  }
};
