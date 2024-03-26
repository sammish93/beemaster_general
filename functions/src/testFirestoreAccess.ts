import { fetchWeatherForecast } from "../../data/api/weatherApi";
import { deserialiseCurrentForecast } from '../../domain/weatherForecastDeserialiser';
import * as admin from 'firebase-admin';
import serviceAccount from '../../firebase-admin-key.json';

admin.initializeApp({
    projectId: "beemastergeneral",
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount)
});

// Only used to test that the database is queried correctly in 'notification_task.ts'.

async function retrieveAndLogUserData() {
  console.log("Recurring background task started.");

  const users = admin.firestore().collection("users");
  const userSnapshot = await users.get();

  if (userSnapshot.empty) {
    console.log("No active users found.");
    return;
  }

  for (const user of userSnapshot.docs) {
    const userId = user.id;
    console.log(`Retrieved userId: ${userId} from firestore database.`);

    // Log the entire document.
    console.log(user.data());

    const notificationPreference = user.data().notificationPreference;
    console.log(`User notification preference:`);
    for (const [key, value] of Object.entries(notificationPreference)) {
      console.log(`${key}: ${value}`);
    }
    console.log('\n');

    const notificationTypePreference = user.data().notificationTypePreference;
    console.log(`User notification type preference`);
    for (const [key, value] of Object.entries(notificationTypePreference)) {
      console.log(`${key}: ${value}`);
    }
    console.log('\n');

    const hives = admin.firestore().collection('users').doc(userId).collection('hives');
    const hivesSnapshot = await hives.get();

    if (hivesSnapshot.empty) {
      console.log(`User: ${userId} has currently no hives.`);
    } 
    else {
      hivesSnapshot.forEach(async hive => {

        const hiveData = hive.data();
        const hiveNotificationPreference = hiveData.notificationTypePreference;

        if (hiveNotificationPreference && hiveNotificationPreference.weather) {
          try {
            const weatherData = await fetchWeatherForecast(hiveData.latLng); 
            const currentForecast = deserialiseCurrentForecast(weatherData);

            console.log(`Current forecast: ${currentForecast}`);
          }
          catch (error) {
            console.error(`Could not retrieve the latest weather forecast for hive ID: ${hive.id}`)
          }
        }
        else {
          console.log(`Weather notifications are turned off for hive ID: ${hive.id}`);
        }

      });
    }
  }
}

retrieveAndLogUserData().catch(console.error);
