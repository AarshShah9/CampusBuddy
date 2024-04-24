import { useCallback, useEffect, useRef, useState } from "react";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { Platform } from "react-native";
import { storeUserPushToken } from "~/lib/apiFunctions/PushNotification";
import { EXPO_ACCESS_TOKEN } from "@env";
import { useNavigation } from "@react-navigation/native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

type sendNotificationArgs = {
  expoPushToken: string;
  title: string;
  body: string;
  data?: any;
};

const sendPushNotification = async (args: sendNotificationArgs) => {
  const { expoPushToken, title, body, data } = args;
  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    body: JSON.stringify({
      to: expoPushToken,
      sound: "default",
      title,
      body,
      data,
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${EXPO_ACCESS_TOKEN}`,
    },
  });
};

const registerForPushNotificationsAsync = async () => {
  let token;

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = await Notifications.getExpoPushTokenAsync({
      projectId: Constants?.expoConfig?.extra?.eas?.projectId,
    });

    // send the push token to be stored in the database if permission was just granted
    if (existingStatus !== "granted") {
      await storeUserPushToken(token);
    }
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
};

export default function usePushNotifications(
  onTapNotification?: (response: Notifications.NotificationResponse) => void,
) {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState<
    Notifications.Notification | undefined
  >();
  const navigation = useNavigation<any>();
  const onTap = (notification: Notifications.NotificationResponse) => {
    onTapNotification?.(notification);
    if (notification.notification.request.content.data?.route) {
      switch (notification.notification.request.content.data.routeName) {
        case "EventDetails":
          navigation.navigate("EventDetails", {
            id: notification.notification.request.content.data.routeParams
              .eventId,
          });
          break;
        default:
          break;
      }
    }
  };

  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  const sendNotification = useCallback(
    async ({
      title,
      body,
      data,
    }: Omit<sendNotificationArgs, "expoPushToken">) => {
      await sendPushNotification({ expoPushToken, title, body, data });
    },
    [expoPushToken],
  );

  const sendLocalNotification = useCallback(
    async ({
      title,
      body,
      data,
    }: Omit<sendNotificationArgs, "expoPushToken">) => {
      const input: Notifications.NotificationRequestInput = {
        content: { title, body, data },
        trigger: null, // Schedule immediately
      };
      await Notifications.scheduleNotificationAsync(input);
    },
    [],
  );

  useEffect(() => {
    registerForPushNotificationsAsync().then(
      (token) => token && setExpoPushToken(token.data),
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) =>
        onTap(response),
      );

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current!,
      );
      Notifications.removeNotificationSubscription(responseListener.current!);
    };
  }, []);

  return {
    expoPushToken,
    sendNotification,
    sendLocalNotification,
    notification,
  };
}
