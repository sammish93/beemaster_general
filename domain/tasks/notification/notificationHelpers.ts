import { NotificationType } from "@/constants/Notifications";
import { User } from "@/models";
import { HiveModel } from "@/models/hiveModel";


export const logMessage = (notificationType: string, user: User, hive: HiveModel) => {
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