import { NotificationType } from "@/constants/Notifications";

const getImageResourceFromNotificationType = (notificationType: NotificationType): any => {
    switch(notificationType) {
        case NotificationType.ConsiderFeeding:
            return require("@/assets/images/notifications/considerFeeding.jpg");
        case NotificationType.ConsiderExpanding:
            return require("@/assets/images/notifications/considerExpanding.jpg");
        case NotificationType.HoneyHarvest:
            return require("@/assets/images/notifications/honeyHarvest.jpg");
        case NotificationType.Maintenance:
            return require("@/assets/images/notifications/maintenance.jpg");
        case NotificationType.Weather:
            return require("@/assets/images/notifications/weather.jpg");
        case NotificationType.CheckHive:
            return require("@/assets/images/notifications/checkHive.jpg");
        case NotificationType.PossibleSwarm:
            return require("@/assets/images/notifications/possibleSwarm.jpg");
        case NotificationType.CustomReminder:
            return require("@/assets/images/notifications/customReminder.jpg");
        default:
            return require("@/assets/images/notifications/customReminder.jpg");
    }
}

export default getImageResourceFromNotificationType