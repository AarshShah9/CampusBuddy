import { useCallback, useEffect, useRef, useState } from "react";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { Platform } from "react-native";

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});

type sendNotificationArgs = {
    expoPushToken: string,
    title: string,
    body: string,
    data?: any
}
const sendPushNotification = async (args: sendNotificationArgs) =>  {
    const { expoPushToken, title, body, data } = args

    await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        body: JSON.stringify({
            to: expoPushToken,
            sound: 'default',
            title,
            body,
            data
        }),
        headers: {
            'Content-Type': 'application/json',
        }
    })
}

const registerForPushNotificationsAsync = async () => {
    let token;

    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        token = await Notifications.getExpoPushTokenAsync({
            projectId: Constants?.expoConfig?.extra?.eas?.projectId,
        });
    } else {
        alert('Must use physical device for Push Notifications');
    }

    return token;
}

export default function usePushNotifications() {
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState<Notifications.Notification | undefined>();

    const notificationListener = useRef<Notifications.Subscription>();
    const responseListener = useRef<Notifications.Subscription>();

    const sendNotification = useCallback(
        async ({ title, body, data }: Omit<sendNotificationArgs, "expoPushToken">) => {
            await sendPushNotification({ expoPushToken, title, body, data })
        }, 
        [expoPushToken]
    )

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => token && setExpoPushToken(token.data));

        notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
            setNotification(notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
            console.log('notification response', response);
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current!);
            Notifications.removeNotificationSubscription(responseListener.current!);
        };
    }, []);

    return {
        expoPushToken,
        sendNotification,
        notification
    }
};