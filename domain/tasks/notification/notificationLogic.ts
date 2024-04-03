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

    // Temporary solution - the other hives in the db is missing lots of fields.
    const filteredHive = hives.filter(hive => hive.id === 'Es2njxWBdXky6zhu9UBZ');
    for (const hive of filteredHive) {
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
                const userPref = userPreference[notificationType];
                const hivePref = hivePreference[notificationType];
            
                // Check the user and hive preferences.
                if (userPref && hivePref) {

                    const params = { user, hive, weatherData: processedData }
                    
                    // Execute strategy.
                    notificationStrategies[notificationType](params);
                }
                else {
                    console.log(`Notification ${userPref} is turned of for both user and hive`);
                }
            });
        } catch (error) {
            console.error(`Error in processing hive ${hive.id} for user ${user.email}: ${error}`);
        }
    };
}