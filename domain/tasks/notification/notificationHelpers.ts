import { NotificationType } from "@/constants/Notifications";
import { Hive, User } from "@/models";


export const logMessage = (notificationType: string, user: User, hive: Hive) => {
    console.log(`Sending '${notificationType}' notification to ${user.email} for hive ${hive.id}`);
}

export const createNotificationObject = (hiveId: string, notificationType: NotificationType, message: string) => {
    return {
        hiveId: hiveId,
        notificationType: notificationType,
        timeStamp: new Date(Date.now()),
        isRead: false,
        message: message
    }
}