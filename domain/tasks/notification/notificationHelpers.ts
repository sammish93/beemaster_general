import { NotificationType } from "@/constants/Notifications";
import { User } from "@/models";
import { HiveModel } from "@/models/hiveModel";
import { HiveNotification } from "@/models";


export const notificationMessages = (hiveName: string, type: NotificationType): string => {
    let message = "";
    switch (type) {
        case NotificationType.CheckHive: 
            message = `Drastic weather change detected for hive: ${hiveName} Consider checking the hive!`
        case NotificationType.ConsiderExpanding:
            message = `Weight of hive: ${hiveName} has increased significantly, consider expanding!`
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