import { fetchWeatherForecast } from "../../data/api/weatherApi";
import { deserialiseCurrentForecast } from '../../domain/weatherForecastDeserialiser';
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
        hivesSnapshot.forEach(async hive => {
            logger.log(`Hive ID: ${hive.id}, \nHive Data: ${JSON.stringify(hive.data())}`);
            const hiveData = hive.data();
            const hiveNotificationPreference = hiveData.notificationTypePreference;

            // TODO: Run forecast on every hive.
            // Check if weather forecast preference is on for this hive.
            if (hiveNotificationPreference && hiveNotificationPreference.weather) {
              try {
                const weatherData = await fetchWeatherForecast(hiveData.latLng);
                const currentForecast = deserialiseCurrentForecast(weatherData);

                // TODO: Use Lorena´s functions to decide if we need to send out a notification.
              } 
              catch (error) {
                logger.error(`Could not retrieve the latest weather forecast for hive ID: ${hive.id}`)
              }
            }
            else {
              logger.log(`Weather notifications are turned off for hive ID: ${hive.id}`);
            }
        });
    }
  }
});
