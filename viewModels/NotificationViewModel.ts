import { action, makeAutoObservable, observable, runInAction } from "mobx";
import * as Localization from "expo-localization";
import { I18n } from "i18n-js";
import en from "@/constants/localisation/en.json";
import no from "@/constants/localisation/no.json";
import {
  PrecipitationMeasurement,
  TemperatureMeasurement,
  WeightMeasurement,
  WindSpeedMeasurement,
} from "@/constants/Measurements";
import {
  availableLanguages,
  availableCountries,
} from "@/constants/LocaleEnums";
import { Platform } from "react-native";
import { notifications } from "@/data/notificationData";
import { HiveNotification } from "@/models/notification";
import { auth, db } from "@/firebaseConfig";
import {
  getDocs,
  collection,
  query,
  where,
  doc,
  updateDoc,
} from "firebase/firestore";

class NotificationViewModel {
  notifications: HiveNotification[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  @action async fetchNotifications() {
    console.log("Fetching notifications for user");
    const userId = auth.currentUser?.uid;
    if (!userId) {
      console.error("No user ID found, user might not be logged in");
      return;
    }
    const notificationsRef = collection(db, `users/${userId}/notifications`);
    const unreadQuery = query(notificationsRef, where("isRead", "==", false));

    try {
      const querySnapshot = await getDocs(unreadQuery);
      if (querySnapshot.empty) {
        console.log("No unread notifications found");
      }
      runInAction(() => {
        this.notifications = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            hiveId: data.hiveId,
            notificationType: data.notificationType,
            message: data.message,
            isRead: data.isRead,
            timestamp: new Date(data.timeStamp.seconds * 1000),
          } as HiveNotification;
        });
        console.log("Loaded notifications: ", this.notifications);
      });
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  }

  @action setNotifications(notifications: HiveNotification[]) {
    console.log("Setting notifications", notifications);
    this.notifications = notifications;
  }

  @action addNotification(notification: HiveNotification) {
    // TODO DB - Write to DB.
    this.notifications = [...this.notifications, notification];
  }

  @action getNotificationFromId(
    notificationId: string
  ): HiveNotification | undefined {
    return this.notifications.find((item) => item.id === notificationId);
  }

  @action async modifyNotification(notification: HiveNotification) {
    // TODO DB - Update notification in DB based on its id. If isRead value = true then potentially
    // delete the notification from the DB. Storage is cheap though.. might not be important to
    // actually delete.
    const noteIndex = this.notifications.findIndex(
      (notificationObject) => notificationObject.id === notification.id
    );
    if (noteIndex !== -1) {
      this.notifications[noteIndex] = notification;
      const userId = auth.currentUser?.uid;
      if (userId) {
        const notificationRef = doc(
          db,
          `users/${userId}/notifications/${notification.id}`
        );
        try {
          await updateDoc(notificationRef, {
            isRead: notification.isRead,
          });
          console.log("notifications update successfully", notification.id);
        } catch (error) {
          console.error("Error updating notification in Firestore:", error);
        }
      }
    }
  }

  @action markNotificationsAsRead() {
    // TODO DB - update all notifications for a single user by setting all isRead values to true.
    this.notifications.forEach((notification) => {
      notification.isRead = true;
    });
  }

  @action getUnreadNotificationAmount() {
    const unreadNotificationsAmount = this.notifications.filter(
      (notification) => !notification.isRead
    ).length;

    return unreadNotificationsAmount;
  }

  @action removeNotification(notificationId: string) {
    this.notifications = this.notifications.filter(
      (notificationObject) => notificationObject.id !== notificationId
    );
  }
}

export default new NotificationViewModel();
