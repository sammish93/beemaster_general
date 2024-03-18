export enum NotificationType {
    ConsiderFeeding = "consider feeding",
    ConsiderExpanding = "consider expanding",
    HoneyHarvest = "honey harvest",
    Maintenance = "maintenance",
    Weather = "weather",
    CheckHive = "check hive",
    PossibleSwarm = "possible swarm",
    CustomReminder = "custom reminder"
}

export type NotificationPreference = {
    [key in NotificationType]: boolean;
}