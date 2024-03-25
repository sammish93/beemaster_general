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

    const notificationPreference = user.data().notificationPrefrence;
    console.log(`User notification preference: ${JSON.stringify(notificationPreference)}`);

    const notificationTypePrefrence = user.data().notificationTypePrefrence;
    console.log(`User notification type preference: ${JSON.stringify(notificationTypePrefrence)}`);
  }
}

retrieveAndLogUserData().catch(console.error);
