import { onSchedule } from 'firebase-functions/v2/scheduler';
import { logger } from 'firebase-functions';
import * as admin from 'firebase-admin';
import { getAllUsers } from './utils/utils';

admin.initializeApp();

export const recurringBackgroundTask = onSchedule('every 60 min', async () => {
    logger.log('Recurring background task started.');

    const userSnapshot = await getAllUsers(admin, 'users');
    if (userSnapshot.empty) {
        logger.log('No active users found.');
        return;
    }

    // Retrieve userId.
    for (const user of userSnapshot.docs) {

        const userId = user.id;
        logger.log(`Retrieved userId: ${userId} from firestore database.`);

        // TODO: Retrieve preferences.
        const userPreferences = user.data().notificationPreferences;
        logger.log(`User preferences: ${userPreferences}`);
    }

});


