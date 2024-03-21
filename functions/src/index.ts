import {onRequest} from "firebase-functions/v2/https";
import * as admin from "firebase-admin";

admin.initializeApp();

/**
 * Firebase Cloud Function for registering sensor weight data.
 * 
 * The function is exclusively designed to handle POST requests to add new weight 
 * readings from sensors to our Firestore database. It expects 'userId', 'hiveId'
 * and 'weight' fields in the request body. 
 * 
 * The function adds the weight data to the 'weightReading' subcollection under the
 * specific user´s hive document.
 * 
 * POST Request body format:
 * {
 *  "userId": "user´s unique identifier",
 *  "hiveId": "hive´s unique identifier within the user´s collection",
 *  "weight": numeric weight value from the sensor
 * }
 */
export const addWeightData = onRequest(async (request, response) => {

  if (request.method !== "POST") {
    response.status(405).send("Only 'POST' method allowed!");
    return;
  }

  const userId = request.body.userId;
  const hiveId = request.body.hiveId;
  const weightData = request.body.weight;

  if (!userId || !hiveId || !weightData) {
    response.status(400).send("Missing fields in request - userId, hiveId, weight.");
    return;
  }

  // Timestamp in ISO 8601-format.
  const timeNow = admin.firestore.Timestamp.now();
  const date = timeNow.toDate(); // Convert to javascript date object.
  const timeStamp = date.toISOString();

  try {
    
    // Construct path for new weight reading document.
    const weightReadingsRef = admin.firestore()
      .collection("users").doc(userId)
      .collection("hives").doc(hiveId)
      .collection("weightReading");

    // Add the new weight reading with a Firestore-generated ID in the subcollection.
    const docRef = await weightReadingsRef.add({
      weight: weightData,
      date: timeStamp
    });

    response.json({result: `Weight data added with ID: ${docRef.id}`});
  } catch (error) {
    console.error("Error writing document: ", error);
    response.status(500).send("Error writing document to db");
  }
});
