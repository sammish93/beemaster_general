export enum NotificationType {
  considerFeeding = "considerFeeding",
  ConsiderExpanding = "considerExpanding",
  HoneyHarvest = "honeyHarvest",
  Maintenance = "maintenance",
  Weather = "weather",
  CheckHive = "checkHive",
  PossibleSwarm = "possibleSwarm",
  CustomReminder = "customReminder",
}

export type NotificationPreference = {
  [key in NotificationType]: boolean;
};
