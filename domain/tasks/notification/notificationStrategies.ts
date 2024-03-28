import { CurrentForecast } from "@/models/forecast";
import { Hive } from "@/models/hive";
import { User } from "@/models/user";

interface Props {
    user: User,
    hive: Hive,
    currentForecast: CurrentForecast
}

export const notificationStrategies = {

    checkHive: (prop: Props) => {
        logMessage('checkHive', prop.user, prop.hive);
    },

    considerExpanding: (prop: Props) => {
        logMessage('considerExpanding', prop.user, prop.hive);
    },

    considerFeeding: (prop: Props) => {
        logMessage('considerFeeding', prop.user, prop.hive);
    },

    customReminder: (prop: Props) => {
        logMessage('customReminder', prop.user, prop.hive);
    },

    honeyHarvest: (prop: Props) => {
        logMessage('honeyHarvest', prop.user, prop.hive);
    },

    maintenance: (prop: Props) => {
        logMessage('maintenance', prop.user, prop.hive);
    },

    possibleSwarm: (prop: Props) => {
        logMessage('possibleSwarm', prop.user, prop.hive);
    },

    weather: (prop: Props) => {
        logMessage('weather', prop.user, prop.hive);
    }
}

const logMessage = (notificationType: string, user: User, hive: Hive) => {
    console.log(`Sending '${notificationType}' notification to ${user.email} for hive ${hive.id}`);
}