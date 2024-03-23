import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';

// Unique identification name for the background task defined in TaskManager and BackgroundFetch.
const BACKGROUND_TASK_NAME = 'background-fetch-task';

// Definition of the task, parameters are the name we want to give the task and a function to be executed.
TaskManager.defineTask(BACKGROUND_TASK_NAME, async () => {

    // TODO: Implement the background task here.

    // Return a result to indicate completion.
    return BackgroundFetch.BackgroundFetchResult.NewData;
});
