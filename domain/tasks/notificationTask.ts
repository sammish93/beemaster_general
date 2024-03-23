import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import * as SecureStore from 'expo-secure-store';

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
    try {
        await BackgroundFetch.registerTaskAsync(BG_TASK_NAME, {
            minimumInterval: 5, 
            stopOnTerminate: false, 
            startOnBoot: true, 
        });

        // Hent antallet registrerte oppgaver og logg dette
        const tasks = await TaskManager.getRegisteredTasksAsync();
        tasks.forEach(task => {
            console.log(`Oppgavens navn: ${task.taskName}, oppgave type: ${task.taskType}`);
        })
    } catch (error) {
        console.error(`Feil ved registrering av bakgrunnsoppgave: ${error}`);
    }
};

// Function used to stop future background task calls.
export const stopBackgroundTask = async () => BackgroundFetch.unregisterTaskAsync(BG_TASK_NAME);
