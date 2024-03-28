import forecast from "@/app/hive/forecast";
import { areTemperaturesConsistentlyWarm, isSnowForecast, isWarmerEachDayInSpring } from "@/domain/notificationFunctions";
import { CurrentForecast, DailyForecast, WeeklySimpleForecast } from "@/models/forecast";
import { Hive } from "@/models/hive";
import { User } from "@/models/user";

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

export const notificationStrategies = {

    checkHive: ({ user, hive, weatherData}: Props) => {
        logMessage('checkHive', user, hive);
    },

    considerExpanding: ({ user, hive, weatherData}: Props) => {
        logMessage('considerExpanding', user, hive);
    },

    considerFeeding: ({ user, hive, weatherData}: Props) => {
        logMessage('considerFeeding', user, hive);
    },

    customReminder: ({ user, hive, weatherData}: Props) => {
        logMessage('customReminder', user, hive);
    },

    honeyHarvest: ({ user, hive, weatherData}: Props) => {
        logMessage('honeyHarvest', user, hive);
    },

    maintenance: ({ user, hive, weatherData}: Props) => {
        logMessage('maintenance', user, hive);
    },

    possibleSwarm: ({ user, hive, weatherData}: Props) => {
        logMessage('possibleSwarm', user, hive);
    },

    weather: ({ user, hive, weatherData}: Props) => {
        const weeklyTemperatures = getWeeklyTemperatureData(weatherData.weeklyForecast);
        if (areTemperaturesConsistentlyWarm(weeklyTemperatures, weeklyTemperatures.length)) {
            logMessage('warm trend', user, hive);
        }
        
        const weatherConditions = getWeatherConditions(weatherData.weeklyForecast);
        if (isSnowForecast(weatherConditions)) {
            logMessage('snow forecast', user, hive);
        }

        if (isWarmerEachDayInSpring(weeklyTemperatures)) {
            logMessage('warming trend in spring', user, hive);
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