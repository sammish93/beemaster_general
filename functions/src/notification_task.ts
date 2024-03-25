import { onSchedule } from 'firebase-functions/v2/scheduler';
import { logger } from 'firebase-functions';
import * as admin from "firebase-admin";
import { firestore } from 'firebase-admin';

admin.initializeApp();

export const recurringBackgroundTask = onSchedule('every 60 min', async () => {
    logger.log('Recurring background task started.');

    // TODO: Retrieve userId, preferences and hives.
    const userSnapshot = await getAllUsers('users');

    if (userSnapshot.empty) {
        logger.log('No active users found.');
        return;
    }

    for (const user of userSnapshot.docs) {
        const userId = user.id;
    }

});

// Helper function to retrieve all active users.
const getAllUsers = async (collectionName: string) => {
    const users = admin.firestore().collection(collectionName);
    return await users.get();
} 
