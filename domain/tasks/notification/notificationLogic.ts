import { Hive } from "@/models/hive";
import { User } from "@/models/user";
import { fetchWeatherForHive } from "../weather/weatherDataFetch";
import { processWeatherDataForHive } from "../weather/weatherDataProcessor";
import { notificationStrategies } from "./notificationStrategies"; 

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

        // Get weather data for hive and process it.
        const weatherData = await fetchWeatherForHive(hive);
        const processedData = await processWeatherDataForHive(weatherData);

        const userPreference = user.notificationTypePreference;
        const hivePreference = hive.notificationTypePreference

        // Iterate over the strategies.
        Object.keys(notificationStrategies).forEach(strategy => {
            const notificationType = strategy as keyof typeof hive.notificationTypePreference;
            
            // Check the user and hive preferences.
            if (userPreference[notificationType] && hivePreference[notificationType]) {

                const currentForecast = processedData.currentForecast;
                const params = {user, hive, currentForecast}

                // Execute strategy.
                notificationStrategies[notificationType](params);
            }
        });
    };
}