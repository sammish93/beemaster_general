import { Hive } from "@/models/hive";
import { User } from "@/models/user";
import { fetchWeatherForHive } from "../weather/weatherDataFetch";
import { processWeatherDataForHive } from "../weather/weatherDataProcessor";
import { notificationStrategies } from "./notificationStrategies"; 
import * as Notification from "expo-notifications";

interface NotificationPreference {
    email: boolean,
    mobile: boolean,
    sms: boolean
}

export const getActivatedPreferences = (preferences: NotificationPreference) => {
    const activated = Object.entries(preferences).filter(([key, value]) => value === true);
    return Object.fromEntries(activated);
}

export const evaluateAndSendNotification = async (user: User, hives: Hive[]) => {
    for (const hive of hives) {
        try {
            // Get weather data for hive and process it.
            const weatherData = await fetchWeatherForHive(hive);
            const processedData = await processWeatherDataForHive(weatherData);
            
            // Get user and hive preferences.
            const userPreference = user.notificationTypePreference;
            const hivePreference = hive.notificationTypePreference

            // Iterate over the strategies.
            Object.keys(notificationStrategies).forEach(strategy => {
                const notificationType = strategy as keyof typeof hive.notificationTypePreference;
            
                // Check the user and hive preferences.
                if (userPreference[notificationType] && hivePreference[notificationType]) {

                    const params = { user, hive, weatherData: processedData }
                    
                    // Execute strategy.
                    notificationStrategies[notificationType](params);
                }
            });
        } catch (error) {
            console.error(`Error in processing hive ${hive.id} for user ${user.email}: ${error}`);
        }
    };
}

interface NotificationProps {
    title: string,
    body: string
}

export const sendNotification = async ({ title, body }: NotificationProps) => {
    const token = (await Notification.getExpoPushTokenAsync()).data;

    const message = { 
        to: token, 
        title: title, 
        body: body
    };

    await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(message)
    });
}