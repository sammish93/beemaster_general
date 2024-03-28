import { areTemperaturesConsistentlyWarm, isSnowForecast, isWarmerEachDayInSpring } from "@/domain/notificationFunctions";
import { CurrentForecast, DailyForecast, WeeklySimpleForecast } from "@/models/forecast";
import { Hive } from "@/models/hive";
import { User } from "@/models/user";

interface Props {
    user: User,
    hive: Hive,
    weatherData: {
        currentForecast: CurrentForecast,
        dailyForecast: DailyForecast,
        weeklyForecast: WeeklySimpleForecast
    }
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
        logMessage('weather', user, hive);
    }
}

const logMessage = (notificationType: string, user: User, hive: Hive) => {
    console.log(`Sending '${notificationType}' notification to ${user.email} for hive ${hive.id}`);
}