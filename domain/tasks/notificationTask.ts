import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';

// Unique identification for the background task, used in TaskManager and startBackgroundTask.
const BG_TASK_NAME = 'notification-task';

// Definition of the task, params are the name we want to give the task and a function to be executed.
TaskManager.defineTask(BG_TASK_NAME, async () => {
    try {
        // TODO: Implement the background task here.
        console.log(`BackgroundTask: ${BG_TASK_NAME} is running!`);

        // Return a result to indicate completion.
        return BackgroundFetch.BackgroundFetchResult.NewData;
    } catch (error) {
        console.error(`Error in background task: ${BG_TASK_NAME}: ${error}`);
        return BackgroundFetch.BackgroundFetchResult.Failed;
    }
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
            try {
                console.log("Starting background task.");
                const result = await BackgroundFetch.registerTaskAsync(BG_TASK_NAME, {
                    minimumInterval: 60, // 1 hour.
                    stopOnTerminate: false, // For android, continue running after the app exits.
                    startOnBoot: true, // For android, start after the device reboots.
                });
                console.log(`Result of background promise: ${result}`);
            } catch (error) {
                console.error(`Error while registering background task: ${error}`);
            }
        }
    }
}

// Function used to stop future background task calls.
export const stopBackgroundTask = async () => BackgroundFetch.unregisterTaskAsync(BG_TASK_NAME);
