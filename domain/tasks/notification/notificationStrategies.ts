import { CurrentForecast, DailyForecast, WeeklySimpleForecast } from "@/models/forecast";
import { Hive } from "@/models/hive";
import { User } from "@/models/user";
import { HiveNotification } from "@/models/notification";
import { NotificationType } from "@/constants/Notifications";
import { sendNotification } from "./sendNotification";
import { 
    areTemperaturesConsistentlyWarm, 
    doesHiveWeightIncreaseSignificantly, 
    isHumidityChangeDrastic, isSnowForecast, 
    isTemperatureChangeDrastic, isWarmerEachDayInSpring, 
    doesHiveWeightDecreaseInEarlySpring, doesHiveWeightDecreaseInAutumn,
    createBeekeepingReminder, isWarmDryLowWindDay,
    isWarmDryLowWindDayBetweenSummerAndEarlyAutumn
} from "@/domain/notificationFunctions";

interface WeatherData {
    currentForecast: CurrentForecast,
    dailyForecast: DailyForecast,
    weeklyForecast: WeeklySimpleForecast
}

interface Props {
    user: User,
    hive: Hive,
    weatherData: WeatherData
}

// TODO: When a hive notification is sent, a 'HiveNotification' object is to be
// created and written to the DB.

export const notificationStrategies = {

    checkHive: async ({ user, hive, weatherData }: Props) => {
        const dailyTemperatures = getDailyTemperatureData(weatherData.dailyForecast);
        const dailyHumidities = getDailyHumidityData(weatherData.dailyForecast);

        if (isTemperatureChangeDrastic(dailyTemperatures) || isHumidityChangeDrastic(dailyHumidities)) {
            logMessage('checkHive', user, hive);

            await sendNotification({
                title: `Check Your Hive: ${hive.hiveName}`,
                body: `Drastic weather change detected near hive: ${hive.hiveName}. Consider checking the hive!`
            }).catch(error => console.log(`Error sending notification: ${error}`));
        }
    },

    considerExpanding: async ({ user, hive, weatherData }: Props) => {

        // TODO: Swap with real values from db.
        const dailyHiveWeights = [150, 152, 154, 155, 156];
        if (doesHiveWeightIncreaseSignificantly(dailyHiveWeights)) {
            logMessage('significant weight increase', user, hive);

            await sendNotification({
                title: 'Significant Weight Increase Detected',
                body: `Weight of hive: ${hive.hiveName} has increased significantly, consider expanding!`
            }).catch(error => console.log(`Error sending notification: ${error}`));
        }        

        const weeklyTemperatures = getWeeklyTemperatureData(weatherData.weeklyForecast);
        if (areTemperaturesConsistentlyWarm(weeklyTemperatures, weeklyTemperatures.length)) {
            logMessage('warm trend', user, hive);
            
            await sendNotification({
                title: 'Warm Trend Detected',
                body: `Its getting warm around ${hive.hiveName}. Consider expanding the hive.`
            }).catch(error => console.log(`Error sending notification: ${error}`));
        }
    },

    considerFeeding: async ({ user, hive }: Props) => {

        // TODO: Swap with real values from db.
        const hiveWeights = [150, 156, 159, 180];

        if (doesHiveWeightDecreaseInEarlySpring(hiveWeights)) {
            logMessage('considerFeeding', user, hive);

            await sendNotification({
                title: 'Hive Weight Decrease In Early Spring',
                body: `Weight of hive: ${hive.hiveName} has decreased significantly this early spring. It might be a good time to consider feeding your bees.`
            }).catch(error => console.log(`Error in sending notification: ${error}`));
        }

        if (doesHiveWeightDecreaseInAutumn(hiveWeights)) {
            logMessage('considerFeeding', user, hive);

            await sendNotification({
                title: 'Hive Weight Decrease In Autumn',
                body: `Weight of hive: ${hive.hiveName} has decreased significantly this autumn. It might be a good time to consider feeding your bees.`
            }).catch(error => console.log(`Error in sending notification: ${error}`));
        }
    },

    customReminder: async ({ user, hive, weatherData}: Props) => {
        logMessage('customReminder', user, hive);

        // Gonna add 'createBeekeepingReminder' here.
    },

    honeyHarvest: async ({ user, hive, weatherData}: Props) => {
    
        const dailyWeatherConditions = getDailyWeatherConditionsFromHourly(weatherData.dailyForecast);
        if (isWarmDryLowWindDayBetweenSummerAndEarlyAutumn(dailyWeatherConditions)) {
            logMessage('honeyHarvest', user, hive);

            await sendNotification({
                title: `Ideal Weather for Honey Harvest at ${hive.hiveName}`,
                body: `Today's forecast promises perfect conditions for honey harvesting at ${hive.hiveName} with warm temperatures, low humidity, and gentle breezes.`
            }).catch(error => console.log(`Error in sending notification: ${error}`));
        }
    },

    maintenance: async ({ user, hive, weatherData}: Props) => {
        logMessage('maintenance', user, hive);

        // Gonna add 'isWarmDryLowWindDay'
        // and 'isWarmDryLowWindDayBetweenSummerAndEarlyAutumn' here.
    },

    possibleSwarm: async ({ user, hive, weatherData}: Props) => {
        logMessage('possibleSwarm', user, hive);

        // Gonna add 'haveFewBeesExited', 'isSwarmingRiskBasedOnUserDefinedSeason'
        // and 'doesHiveWeightDecreaseSignificantly' here.
    },

    weather: async ({ user, hive, weatherData}: Props) => {
        const weeklyTemperatures = getWeeklyTemperatureData(weatherData.weeklyForecast);
        if (areTemperaturesConsistentlyWarm(weeklyTemperatures, weeklyTemperatures.length)) {
            logMessage('warm trend', user, hive);
            
            await sendNotification({
                title: 'Warm Trend Detected',
                body: `Its getting warm around ${hive.hiveName}. Consider checking it out.`
            }).catch(error => console.log(`Error sending notification: ${error}`));

            const notificationToStoreInDB = createNotificationObject(
                hive.id,
                NotificationType.Weather,
                `Its getting warm around ${hive.hiveName}. Consider checking it out.`
            );
        }
        
        const weatherConditions = getWeatherConditions(weatherData.weeklyForecast);
        if (isSnowForecast(weatherConditions)) {
            logMessage('snow forecast', user, hive);

            await sendNotification({
                title: 'Snow Forecast',
                body: `Snow is forecasted around hive ${hive.hiveName}.`
            }).catch(error => console.log(`Error sending notification: ${error}`));

            const notificationToStoreInDB = createNotificationObject(
                hive.id,
                NotificationType.Weather,
                `Snow is forecasted around hive ${hive.hiveName}.`
            );
        }

        const dailyTemperature = getDailyTemperatureData(weatherData.dailyForecast);
        if (isWarmerEachDayInSpring(dailyTemperature)) {
            logMessage('warming trend in spring', user, hive);

            await sendNotification({
                title: 'Warming Trend in Spring',
                body: `A warming trend in spring is detected for hive ${hive.hiveName}`
            }).catch(error => console.log(`Error sending notification: ${error}`));

            const notificationToStoreInDB = createNotificationObject(
                hive.id, 
                NotificationType.Weather,
                `A warming trend in spring is detected for hive ${hive.hiveName}`
            );
        }
    }
}

const logMessage = (notificationType: string, user: User, hive: Hive) => {
    console.log(`Sending '${notificationType}' notification to ${user.email} for hive ${hive.id}`);
}

// Helper function.
const getWeeklyTemperatureData = (weeklyForecast: WeeklySimpleForecast) => {
    return [
        weeklyForecast.currentForecast.temperature,
        weeklyForecast.dayTwoForecast.temperature,
        weeklyForecast.dayThreeForecast.temperature,
        weeklyForecast.dayFourForecast.temperature,
        weeklyForecast.dayFiveForecast.temperature,
        weeklyForecast.daySixForecast.temperature,
        weeklyForecast.daySevenForecast.temperature,
    ];
}

// Helper function.
const getWeatherConditions = (weeklyForecast: WeeklySimpleForecast) => {
    return [
        weeklyForecast.currentForecast.weatherType,
        weeklyForecast.dayTwoForecast.weatherType,
        weeklyForecast.dayThreeForecast.weatherType,
        weeklyForecast.dayFourForecast.weatherType,
        weeklyForecast.dayFiveForecast.weatherType,
        weeklyForecast.daySixForecast.weatherType,
        weeklyForecast.daySevenForecast.weatherType,
    ];
}

const getDailyWeatherConditionsFromHourly = (dailyForecast: DailyForecast) => {
    const hourlyForecasts = Object.values(dailyForecast.hourlyForecasts);
    const transformedForecasts = hourlyForecasts.map(forecastPeriod => ({
        temperature: forecastPeriod.temperature,
        humidity: forecastPeriod.humidity,
        windSpeed: forecastPeriod.windSpeed,
    }));

    return transformedForecasts;
}
 
// Helper function.
const getDailyTemperatureData = (dailyForecast: DailyForecast) => {
    return Object.values(dailyForecast).map(forecast => forecast.temperature);
}

// Helper function.
const getDailyHumidityData = (dailyForecast: DailyForecast) => {
    return Object.values(dailyForecast).map(forecast => forecast.humidity);
}

// Helper function.
const createNotificationObject = (hiveId: string, notificationType: NotificationType, message: string) => {
    return {
        hiveId: hiveId,
        notificationType: notificationType,
        timeStamp: new Date(Date.now()),
        isRead: false,
        message: message
    }
}