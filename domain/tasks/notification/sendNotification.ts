import * as Notification from "expo-notifications";

interface NotificationProps {
    title: string,
    body: string
}

export const sendNotification = async ({ title, body }: NotificationProps) => {
    try {
        const token = (await Notification.getExpoPushTokenAsync()).data;
        console.log(`TOKEN: ${token}`);

        const message = { 
            to: token, 
            title: title, 
            body: body
        };

        const response = await fetch('https://exp.host/--/api/v2/push/send', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(message)
        });

        const result = await response.json();
        console.log('Notification response:', result);

    } catch (error) {
        console.error('Error sending notification:', error);
    }
}