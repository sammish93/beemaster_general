import { Hive } from "@/models/hive";
import { User } from "@/models/user";

export const notificationStrategies = {

    checkHive: (user: User, hive: Hive) => {
        logMessage('checkHive', user, hive);
    },

    considerExpanding: (user: User, hive: Hive) => {
        logMessage('considerExpanding', user, hive);
    },

    considerFeeding: (user: User, hive: Hive) => {
        logMessage('considerFeeding', user, hive);
    },

    customReminder: (user: User, hive: Hive) => {
        logMessage('customReminder', user, hive);
    },

    honeyHarvest: (user: User, hive: Hive) => {
        logMessage('honeyHarvest', user, hive);
    },

    maintenance: (user: User, hive: Hive) => {
        logMessage('maintenance', user, hive);
    },

    possibleSwarm: (user: User, hive: Hive) => {
        logMessage('possibleSwarm', user, hive);
    },

    weather: (user: User, hive: Hive) => {
        logMessage('weather', user, hive);
    }
}

const logMessage = (notificationType: string, user: User, hive: Hive) => {
    console.log(`Sending '${notificationType}' notification to ${user.email} for hive ${hive.id}`);
}