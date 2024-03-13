import { NotificationType } from "@/constants/Notifications";
import { HiveNotification } from "@/models/notification";

export const notifications: HiveNotification[] = [
    { id: "abc-1", hiveId: "hive-1234-1234-abc", notificationType: NotificationType.HoneyHarvest, timestamp: new Date(Date.now()), isRead: false, message: "It's time to harvest honey!" },
    { id: "abc-2", hiveId: "hive-1234-1235-abc", notificationType: NotificationType.Weather, timestamp: new Date(Date.now()), isRead: false, message: "Strong winds approaching at 24 m/s" },
    { id: "abc-3", hiveId: "hive-1234-1236-abc", notificationType: NotificationType.CustomReminder, timestamp: new Date(Date.now()), isRead: false, message: "We've only got a couple of eggs in the fridge..." },
    { id: "abc-4", hiveId: "hive-1234-1236-abc", notificationType: NotificationType.ConsiderExpanding, timestamp: new Date(Date.now()), isRead: false, message: "The hive is looking pretty full. Maybe it's time to add a super?" },
    { id: "abc-5", hiveId: "hive-1234-1236-abc", notificationType: NotificationType.Maintenance, timestamp: new Date(Date.now()), isRead: false, message: "Today is a lovely day. Ideal for maintenance!" },
    { id: "abc-6", hiveId: "hive-1234-1236-abc", notificationType: NotificationType.Weather, timestamp: new Date(Date.now()), isRead: false, message: "Blimey. It's absolutely pissing it down." },
    { id: "abc-7", hiveId: "hive-1234-1236-abc", notificationType: NotificationType.PossibleSwarm, timestamp: new Date(Date.now()), isRead: false, message: "The hive's weight dramatically decreased over the past 24 hours. This might be an indication of a swarm." },
    { id: "abc-8", hiveId: "hive-1234-1236-abc", notificationType: NotificationType.ConsiderFeeding, timestamp: new Date(Date.now()), isRead: false, message: "Strong winds are forecast for the next week. Consider supplementing your hive's feed." },
    { id: "abc-9", hiveId: "hive-1234-1236-abc", notificationType: NotificationType.CustomReminder, timestamp: new Date(Date.now()), isRead: false, message: "You should've picked up Janet from the airport yesterday." },
    { id: "abc-10", hiveId: "hive-1234-1236-abc", notificationType: NotificationType.CheckHive, timestamp: new Date(Date.now()), isRead: false, message: "The temperature of the hive decreased during the day. Consider checking the hive." },
    ];