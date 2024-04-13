import * as Notification from "expo-notifications";

interface NotificationProps {
    title: string,
    body: string
}

export const sendNotification = async ({ title, body }: NotificationProps) => {
    await Notification.scheduleNotificationAsync({
        content: {
            title: title,
            body: body,
            data: { withSome: 'data' },
        },
        trigger: { seconds: 1 }, 
    });
}