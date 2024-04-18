import {
  NotificationTypePreference,
  NotificationType,
} from "@/constants/Notifications";
import { HiveNotification } from "@/models/notification";

export const notifications: HiveNotification[] = [
  {
    id: "abc-1",
    hiveId: "Es2njxWBdXky6zhu9UBZ",
    notificationType: NotificationType.HoneyHarvest,
    timestamp: new Date(Date.now()),
    isRead: false,
    message: "It's time to harvest honey!",
  },
  {
    id: "abc-2",
    hiveId: "Es2njxWBdXky6zhu9UBZ",
    notificationType: NotificationType.Weather,
    timestamp: new Date(Date.now()),
    isRead: false,
    message: "Strong winds approaching at 24 m/s",
  },
  {
    id: "abc-3",
    hiveId: "Es2njxWBdXky6zhu9UBZ",
    notificationType: NotificationType.CustomReminder,
    timestamp: new Date(Date.now()),
    isRead: false,
    message: "We've only got a couple of eggs in the fridge...",
  },
  {
    id: "abc-4",
    hiveId: "Es2njxWBdXky6zhu9UBZ",
    notificationType: NotificationType.ConsiderExpanding,
    timestamp: new Date(Date.now()),
    isRead: false,
    message: "The hive is looking pretty full. Maybe it's time to add a super?",
  },
  {
    id: "abc-5",
    hiveId: "Es2njxWBdXky6zhu9UBZ",
    notificationType: NotificationType.Maintenance,
    timestamp: new Date(Date.now()),
    isRead: false,
    message: "Today is a lovely day. Ideal for maintenance!",
  },
  {
    id: "abc-6",
    hiveId: "Es2njxWBdXky6zhu9UBZ",
    notificationType: NotificationType.Weather,
    timestamp: new Date(Date.now()),
    isRead: false,
    message: "Blimey. It's absolutely pissing it down.",
  },
  {
    id: "abc-7",
    hiveId: "Es2njxWBdXky6zhu9UBZ",
    notificationType: NotificationType.PossibleSwarm,
    timestamp: new Date(Date.now()),
    isRead: false,
    message:
      "The hive's weight dramatically decreased over the past 24 hours. This might be an indication of a swarm.",
  },
  {
    id: "abc-8",
    hiveId: "Es2njxWBdXky6zhu9UBZ",
    notificationType: NotificationType.ConsiderFeeding,
    timestamp: new Date(Date.now()),
    isRead: false,
    message:
      "Strong winds are forecast for the next week. Consider supplementing your hive's feed.",
  },
  {
    id: "abc-9",
    hiveId: "Es2njxWBdXky6zhu9UBZ",
    notificationType: NotificationType.CustomReminder,
    timestamp: new Date(Date.now()),
    isRead: false,
    message: "You should've picked up Janet from the airport yesterday.",
  },
  {
    id: "abc-10",
    hiveId: "Es2njxWBdXky6zhu9UBZ",
    notificationType: NotificationType.CheckHive,
    timestamp: new Date(Date.now()),
    isRead: false,
    message:
      "The temperature of the hive decreased during the day. Consider checking the hive.",
  },
];

export const notificationTypePreferences: NotificationTypePreference = {
  [NotificationType.ConsiderFeeding]: true,
  [NotificationType.ConsiderExpanding]: true,
  [NotificationType.HoneyHarvest]: true,
  [NotificationType.Maintenance]: true,
  [NotificationType.Weather]: true,
  [NotificationType.CheckHive]: true,
  [NotificationType.PossibleSwarm]: true,
  [NotificationType.CustomReminder]: true,
};
