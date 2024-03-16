import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Platform } from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import styles from "@/assets/styles";
import { Subscription } from 'expo-modules-core';

// Sets global notification handling behavior.

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

/**
 * Component to display a notification button and the latest notification received.
 * It only renders on iOS and Android platforms, not on the web.
 */
const NotificationButton = () => {
    if (Platform.OS === 'web') {
        return null;
    }
    const theme = useTheme();
    const [expoPushToken, setExpoPushToken] = useState<string>(" ");
    const [notification, setNotification] = useState<Notifications.Notification | null>(null);
    const notificationListener = useRef<Subscription | null>(null);
    const responseListener = useRef<Subscription | null>(null);

    /**
     * Updates the state with the new token.
     * @param token The new token, which might be undefined.
     */
    const updateState = (token: string | undefined) => {
        setExpoPushToken(token ?? "default value");
    };

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => updateState(token));

        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });

        return () => {
            if (notificationListener.current !== null) {
                Notifications.removeNotificationSubscription(notificationListener.current);
            }
            if (responseListener.current !== null) {
                Notifications.removeNotificationSubscription(responseListener.current);
            }
        };
    }, []);

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}>
            <Text>Your expo push token: {expoPushToken}</Text>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Text>Title: {notification && notification.request.content.title} </Text>
                <Text>Body: {notification && notification.request.content.body}</Text>
                <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
            </View>
            <Button
                style={styles(theme).settingsButton}
                mode='contained'
                onPress={async () => {
                    await getPushNotification();
                }}
            >Press to get a notification</Button>
        </View>
    );
}
export default NotificationButton;


/**
 * Schedules a push notification to be sent after a short delay.
 */
async function getPushNotification() {
    await Notifications.scheduleNotificationAsync({
        content: {
            title: "You've got mail! 📬",
            body: 'Here is the notification body',
            data: { data: 'goes here' },
        },
        trigger: { seconds: 2 },
    });
}


/**
 * Registers for push notifications and requests permissions if necessary.
 * Returns the push token for the device.
 */
async function registerForPushNotificationsAsync() {
    let token;
    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
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
        token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log(token);
    } else {
        alert('Must use physical device for Push Notifications');
    }

    return token;
}


//Source: https://docs.expo.dev/versions/latest/sdk/notifications/

