import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import { getUser, getUserHives } from '../db/operations';
import { User } from '@/models/user';
import { evaluateAndSendNotification } from './notification/notificationLogic';
import { HiveModel } from '@/models/hiveModel';
import { useContext } from 'react';
import { MobXProviderContext } from 'mobx-react';

const BG_TASK_NAME = "notification-task";
const { userViewModel } = useContext(MobXProviderContext);

// Definition of the task, params are the name we want to give the task and a function to be executed.
TaskManager.defineTask(BG_TASK_NAME, async () => {
  try {
    console.log(`BackgroundTask: ${BG_TASK_NAME} is running!`);
    const userId = userViewModel.userId;
    const user = (await getUser(userId)) as User;

    if (user) {
      const hives = await getUserHives(user.id) as HiveModel[];

      // Only do this if user and hives exists.
      if (user && hives) {
        await evaluateAndSendNotification(user, hives);
      }
    } 

    // Return a result to indicate completion.
    return BackgroundFetch.BackgroundFetchResult.NewData;
  } catch (error) {
    console.log(`Error in background task: ${BG_TASK_NAME}: ${error}`);
    return BackgroundFetch.BackgroundFetchResult.Failed;
  }
});

export const startBackgroundTask: () => Promise<void> = async () => {
  try {
    await BackgroundFetch.registerTaskAsync(BG_TASK_NAME, {
      minimumInterval: 15,
      stopOnTerminate: false,
      startOnBoot: true,
    });

    const tasks = await TaskManager.getRegisteredTasksAsync();
    tasks.forEach((task) => {
      console.log(`Task name: ${task.taskName}, task type: ${task.taskType}`);
    });

    await BackgroundFetch.setMinimumIntervalAsync(15);
  } catch (error) {
    console.log(`Error in registering background task: ${error}`);
  }
};

// Function used to stop future background task calls.
export const stopBackgroundTask = async () =>
  BackgroundFetch.unregisterTaskAsync(BG_TASK_NAME);
