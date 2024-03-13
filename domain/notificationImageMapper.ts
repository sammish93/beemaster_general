import { NotificationType } from "@/constants/Notifications";

/**
 * A function designed to provide a link to a local image resource based on the type of notification supplied.
 * @param notificationType Takes an object of type {@link NotificationType}.
 * @returns Returns an object of type {@link NodeRequire} that can be used with elements such as <Image> 
 * to render an image stored locally.
 */
const getImageResourceFromNotificationType = (notificationType: NotificationType): NodeRequire => {
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