import { useEffect } from "react";
import VerticalScrollView from "~/components/VerticalScrollView";
import usePushNotifications from "~/hooks/usePushNotifications";

export default function Home() {
  const { expoPushToken, sendLocalNotification } = usePushNotifications();

  useEffect(() => {
    if (!expoPushToken) return;
    sendLocalNotification({
      title: "🎉Welcome to Campus Buddy🎉",
      body: `Your journey to a better campus experience just began!`,
    }).catch((error) =>
      console.log(
        "An error occured when trying to send a notification:\n",
        error,
      ),
    );
  }, [expoPushToken]);

  return <VerticalScrollView />;
}
