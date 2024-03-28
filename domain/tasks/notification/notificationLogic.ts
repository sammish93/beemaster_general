import { Hive } from "@/models/hive";
import { User } from "@/models/user";
import { fetchWeatherForHive } from "../weather/weatherDataFetch";
import { processWeatherDataForHive } from "../weather/weatherDataProcessor";

interface NotificationPreference {
    email: boolean,
    mobile: boolean,
    sms: boolean
}

export const getActivatedPreferences = (preferences: NotificationPreference) => {
    const activated = Object.entries(preferences).filter(([key, value]) => value === true);
    return Object.fromEntries(activated);
}

export const evaluateAndSendNotification = (user: User, hives: Hive[]) => {
    hives.forEach(async hive => {

        const weatherData = await fetchWeatherForHive(hive);
        const processedData = await processWeatherDataForHive(weatherData);

    });

}