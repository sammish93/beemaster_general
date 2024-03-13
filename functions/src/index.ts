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
    const dateString = request.body.date; // On ISO 8601-format.
    if (!id || !weightData || !dateString) {
        response.status(400).send("Missing fields in request - id, weight, date.");
        return;
    }

    try {
        await admin.firestore().collection("sensorWeight").doc(id).set({
            weight: weightData,
            date: dateString
        });
        response.json({result: `Weight data with ID: ${id} and date: ${dateString} added to db.`})
    } catch (error) {
        console.error(`Error writing document: `, error);
        response.status(500).send(`Error writing document to db`);
    }
})

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
