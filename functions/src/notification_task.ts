import { fetchWeatherForecast } from "../../data/api/weatherApi";
import { onSchedule } from "firebase-functions/v2/scheduler";
import { logger } from "firebase-functions";
import * as admin from "firebase-admin";


export const recurringBackgroundTask = onSchedule("every 60 min", async () => {
  logger.log("Recurring background task started.");

  const users = admin.firestore().collection("users");
  const userSnapshot = await users.get();
  if (userSnapshot.empty) {
    logger.log("No active users found.");
    return;
  }

  // Retrieve userId.
  for (const user of userSnapshot.docs) {
    const userId = user.id;
    logger.log(`Retrieved userId: ${userId} from firestore database.`);

    // Retrieve user preferences.
    const userPreferences = user.data().notificationPreference;
    logger.log(`User notification preferences: ${JSON.stringify(userPreferences)}`);

    // Retrieve user notification type preference.
    const userNotificationTypePreference = user.data().notificationTypePreference;
    logger.log(`User notification type preference: ${JSON.stringify(userNotificationTypePreference)}`);

    // Retrieve subcollection 'hives' for this user.
    const hivesCollection = admin.firestore().collection('users').doc(userId).collection('hives');
    const hivesSnapshot = await hivesCollection.get();

    if (hivesSnapshot.empty) {
        logger.log(`No hives found for user: ${userId}.`);
    } 
    else {
        hivesSnapshot.forEach(hive => {
            logger.log(`Hive ID: ${hive.id}, \nHive Data: ${JSON.stringify(hive.data())}`);
            const hiveNotificationPreference = hive.data().notificationTypePreference;

            // TODO: Run forecast on every hive.

        });
    }
  }
});
