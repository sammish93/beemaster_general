const admin = require('firebase-admin');
const serviceAccount = require('../../firebase-admin-key.json');

admin.initializeApp({
    projectId: "beemastergeneral",
    credential: admin.credential.cert(serviceAccount)
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
      hivesSnapshot.forEach(hive => {
        // console.log(`HiveId: ${hive.id}, \nData: ${JSON.stringify(hive.data())}`);

        const hiveNotificationPreference = hive.data().notificationTypePreference;
        console.log("Hive notification type preference");
        if (hiveNotificationPreference) {
          for (const [keys, values] of Object.entries(hiveNotificationPreference)) {
            console.log(`${keys}: ${values}`);
          }
        }
        else {
          console.log("No notification type preference for this hive.");
        }
        console.log("\n");
      });
    }
  }
}

retrieveAndLogUserData().catch(console.error);
