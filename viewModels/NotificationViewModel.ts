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

    notifications = notifications

    constructor() {
        makeAutoObservable(this)
    }

    addNotification(notification: HiveNotification) {
        this.notifications = [...this.notifications, notification];
    }

    getNotificationFromId(notificationId: string): HiveNotification | undefined {
        return this.notifications.find(item => item.id === notificationId);
    }

    modifyNotification(notification: HiveNotification) {
        const noteIndex = this.notifications.findIndex(notificationObject => notificationObject.id === notification.id);
        if (noteIndex !== -1) {
            this.notifications[noteIndex] = notification;
        }
    }

    removeNote(notificationId: string) {
        this.notifications = this.notifications.filter(notificationObject => notificationObject.id !== notificationId);
    }
};

export default new NotificationViewModel()
