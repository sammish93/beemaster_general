export enum NotificationType {
  ConsiderFeeding = "considerFeeding",
  ConsiderExpanding = "considerExpanding",
  HoneyHarvest = "honeyHarvest",
  Maintenance = "maintenance",
  Weather = "weather",
  CheckHive = "checkHive",
  PossibleSwarm = "possibleSwarm",
  CustomReminder = "customReminder",
}

export type NotificationTypePreference = {
  [key in NotificationType]: boolean;
};
