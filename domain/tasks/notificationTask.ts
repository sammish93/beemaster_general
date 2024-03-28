import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import { getAllUsers, getUserHives } from '../db/operations';
import { User } from '@/models/user';
import { processUserHives } from '../db/operations';

const BG_TASK_NAME = 'notification-task';

// Definition of the task, params are the name we want to give the task and a function to be executed.
TaskManager.defineTask(BG_TASK_NAME, async () => {
    try {
        console.log(`BackgroundTask: ${BG_TASK_NAME} is running!`);
        const users = await getAllUsers() as User[];

        const processedHives = users.map(user => processUserHives(user));
        const results = await Promise.all(processedHives);

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

        const tasks = await TaskManager.getRegisteredTasksAsync();
        tasks.forEach(task => {
            console.log(`Task name: ${task.taskName}, task type: ${task.taskType}`);
        })
    } catch (error) {
        console.error(`Error in registering background task: ${error}`);
    }
};

// Function used to stop future background task calls.
export const stopBackgroundTask = async () => BackgroundFetch.unregisterTaskAsync(BG_TASK_NAME);
