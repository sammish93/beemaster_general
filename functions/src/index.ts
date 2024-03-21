import {onRequest} from "firebase-functions/v2/https";
import * as admin from "firebase-admin";

admin.initializeApp();

export const addWeightData = onRequest(async (request, response) => {

  if (request.method !== "POST") {
    response.status(405).send("Only 'POST' method allowed!");
    return;
  }

  // Extract user and hived IDs, and weight data from the request body.
  const userId = request.body.userId;
  const hiveId = request.body.hiveId;
  const weightData = request.body.weight;

  // Validate presence of all required fields.
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
