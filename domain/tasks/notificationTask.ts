import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';

// Unique identification for the background task, used in TaskManager and startBackgroundTask.
const BG_TASK_NAME = 'notification-task';

// Definition of the task, params are the name we want to give the task and a function to be executed.
TaskManager.defineTask(BG_TASK_NAME, async () => {

    // TODO: Implement the background task here.

    // Return a result to indicate completion.
    return BackgroundFetch.BackgroundFetchResult.NewData;
});

export const startBackgroundTask = async () => {

    // Check status for background updates.
    const status = await BackgroundFetch.getStatusAsync();
    switch (status) {
        case BackgroundFetch.BackgroundFetchStatus.Restricted:
        case BackgroundFetch.BackgroundFetchStatus.Denied:
            console.log("BackgroundTask: Background update is disabled.");
            return;
        default: {
            console.log("Register background task.");
            await BackgroundFetch.registerTaskAsync(BG_TASK_NAME, {
                minimumInterval: 60 * 60, // 1 hour.
                stopOnTerminate: false, // For android, continue running after the app exits.
                startOnBoot: true, // For android, start after the device reboots.
            });
        }
    }
}

// Function used to stop future background task calls.
export const stopBackgroundTask = async () => BackgroundFetch.unregisterTaskAsync(BG_TASK_NAME);
