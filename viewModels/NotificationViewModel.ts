import { action, makeAutoObservable, observable, runInAction } from "mobx";
import * as Localization from "expo-localization";
import { I18n } from "i18n-js";
import en from '@/constants/localisation/en.json';
import no from '@/constants/localisation/no.json';
import { PrecipitationMeasurement, TemperatureMeasurement, WeightMeasurement, WindSpeedMeasurement } from "@/constants/Measurements";
import { availableLanguages, availableCountries } from '@/constants/LocaleEnums';
import { Platform } from "react-native";
import { notifications } from "@/data/notificationData";
import { HiveNotification } from "@/models/notification";

class NotificationViewModel {

    @observable notifications = notifications

    constructor() {
        makeAutoObservable(this)
        // TODO DB - Get unread notifications from DB.
        // Right now the notifications are displayed using dummy data.
    }

    @action setNotifications(notifications: HiveNotification[]) {
        this.notifications = notifications;
    }

    @action addNotification(notification: HiveNotification) {
        // TODO DB - Write to DB.
        this.notifications = [...this.notifications, notification];
    }

    @action getNotificationFromId(notificationId: string): HiveNotification | undefined {
        return this.notifications.find(item => item.id === notificationId);
    }

    @action modifyNotification(notification: HiveNotification) {
        // TODO DB - Update notification in DB based on its id. If isRead value = true then potentially 
        // delete the notification from the DB. Storage is cheap though.. might not be important to 
        // actually delete.
        const noteIndex = this.notifications.findIndex(notificationObject => notificationObject.id === notification.id);
        if (noteIndex !== -1) {
            this.notifications[noteIndex] = notification;
        }
    }

    @action markNotificationsAsRead() {
        // TODO DB - update all notifications for a single user by setting all isRead values to true.
        this.notifications.forEach(notification => {
            notification.isRead = true;
        });
    }

    @action getUnreadNotificationAmount() {
        const unreadNotificationsAmount = this.notifications.filter(notification => !notification.isRead).length;
        
        return unreadNotificationsAmount;
    }

    @action removeNotification(notificationId: string) {
        this.notifications = this.notifications.filter(notificationObject => notificationObject.id !== notificationId);
    }
};

export default new NotificationViewModel()
