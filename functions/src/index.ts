import {onRequest} from "firebase-functions/v2/https";
import * as admin from "firebase-admin";

admin.initializeApp();
export const addWeightData = onRequest(async (request, response) => {
  // Return if method is not post.
  if (request.method !== "POST") {
    response.status(405).send("Only 'POST' method allowed!");
    return;
  }

  // Get weight data from request.
  const id = request.body.id;
  const weightData = request.body.weight;
  if (!id || !weightData) {
    response.status(400).send("Missing fields in request - id, weight.");
    return;
  }

  // Timestamp in ISO 8601-format.
  const timeStamp = new Date().toISOString();
  try {
    await admin.firestore().collection("sensorWeight").doc(id).set({
      weight: weightData,
      date: timeStamp,
    });
    response.json({result: `Weight data with ID: ${id} added to db.`});
  } catch (error) {
    console.error("Error writing document: ", error);
    response.status(500).send("Error writing document to db");
  }
});
