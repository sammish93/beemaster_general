import { NotificationType } from "@/constants/Notifications";
import { HiveNotification } from "@/models/notification";

export const notifications: HiveNotification[] = [
    { id: "abc-123", hiveId: "hive-1234-1234-abc", notificationType: NotificationType.HoneyHarvest, timestamp: new Date(Date.now()), isRead: false, message: "It's time to harvest honey!" },
    { id: "abc-1234", hiveId: "hive-1234-1235-abc", notificationType: NotificationType.Weather, timestamp: new Date(Date.now()), isRead: false, message: "Strong winds approaching at 24 m/s" },
    { id: "abc-12345", hiveId: "hive-1234-1236-abc", notificationType: NotificationType.CustomReminder, timestamp: new Date(Date.now()), isRead: false, message: "We've only got a couple of eggs in the fridge..." },
    ];