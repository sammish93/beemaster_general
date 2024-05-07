import { NotificationType } from "@/constants/Notifications";
import { User, HiveModel } from "@/models";
import { HiveNotification } from "@/models/notification";


export const notificationMessages = (
    hiveName: string, 
    type: NotificationType, 
    season?: string): string => {

    let message = "";
    switch (type) {
        case NotificationType.CheckHive: 
            message = `Drastic weather change detected for hive: ${hiveName} Consider checking the hive!`;
        case NotificationType.ConsiderExpanding:
            message = `Weight of hive: ${hiveName} has increased significantly, consider expanding!`;
        case NotificationType.ConsiderFeeding:
            message = `Weight of hive: ${hiveName} has decreased significantly this ${season}. It might be a good time to consider feeding your bees.`;
        case NotificationType.HoneyHarvest:
            message = `Today's forecast promises perfect conditions for honey harvesting at ${hiveName} with warm temperatures, low humidity, and gentle breezes.`;
        case NotificationType.PossibleSwarm:
            message = `Possible swarm detected for hive: ${hiveName}. Check the hive immediately!`;
        case NotificationType.Weather:
            message = `Its getting warm around ${hiveName}. Consider checking it out.`;
    }
    return message;
}

export const logMessage = (notificationType: string, user: User, hive: HiveModel) => {
    console.log(`Sending '${notificationType}' notification to ${user.email} for hive ${hive.id}`);
}

export const createObject = (
    id: string, 
    type: NotificationType, 
    msg: string): HiveNotification => {

    return {
        hiveId: id,
        notificationType: type,
        message: msg,
        isRead: false,
        timestamp: new Date()
    }
}