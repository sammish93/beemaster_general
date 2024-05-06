import { NotificationType } from "@/constants/Notifications";
import { User } from "@/models";
import { HiveModel } from "@/models/hiveModel";
import { HiveNotification } from "@/models";


export const NotificationMessages = {
    CheckHive: `Drastic weather change detected. Consider checking the hive!`
}

export const logMessage = (notificationType: string, user: User, hive: HiveModel) => {
    console.log(`Sending '${notificationType}' notification to ${user.email} for hive ${hive.id}`);
}

export const createNotificationObject = (
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