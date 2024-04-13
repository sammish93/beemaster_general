import { NotificationType } from "@/constants/Notifications";

export interface HiveNotification {
    id: string;
    hiveId: string;
    notificationType: NotificationType;
    timestamp: Date;
    isRead: boolean;
    message: string;
}

export interface NotificationPreference {
    email: boolean,
    mobile: boolean,
    sms: boolean
}
