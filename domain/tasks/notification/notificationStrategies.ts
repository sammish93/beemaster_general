import { areTemperaturesConsistentlyWarm, doesHiveWeightIncreaseSignificantly, isSnowForecast, isWarmerEachDayInSpring, doesHiveWeightDecreaseInEarlySpring, doesHiveWeightDecreaseInAutumn, isIdealBeeWeatherBetweenEarlySpringAndEndAutumn, doesHiveWeightDecreaseSignificantly} from "@/domain/notificationFunctions"
import { createObject, logMessage, notificationMessages, sendNotification, getDailyTemperatureData, getDailyWeatherConditionsFromHourly, getWeatherConditions, getWeeklyTemperatureData} from '../index';
import notificationViewModel from "@/viewModels/NotificationViewModel"
import { User, HiveModel, WeatherData } from "@/models"
import { NotificationType } from "@/constants/Notifications"
import { getSevenLastWeightReadings } from "@/domain/db/operations";

interface Props {
    user: User,
    hive: HiveModel,
    weatherData: WeatherData
}

/**
 * Asynchronous strategies for analyzing weather and hive conditions to generate and send targeted
 * notifications to the user. Each strategy assesses different aspects such as temperature, humidity,
 * and hive weight changes, to decide on sending relevant notifications.
 *
 * Notifications are created based on specific conditions like drastic weather changes, significant weight
 * changes of the hive, or optimal conditions for activities such as expanding the hive, feeding bees, or
 * honey harvesting.
 */
export const notificationStrategies = {

  checkHive: async ({ user, hive, weatherData }: Props) => {
    const dailyTemperatures = getDailyTemperatureData(weatherData.dailyForecast);

    if (areTemperaturesConsistentlyWarm(dailyTemperatures) || isWarmerEachDayInSpring(dailyTemperatures)) {
      logMessage("checkHive", user, hive)

      const message = notificationMessages(hive.name, NotificationType.CheckHive);
      await sendNotification({
        title: `Check Your Hive: ${hive.name}`,
        body: message,
      }).catch((error) => console.log(`Error sending notification: ${error}`));
 
      const notification = createObject(hive.id, NotificationType.CheckHive, message);
      await notificationViewModel.addNotification(notification); 
    }
  },
  
  considerExpanding: async ({ user, hive, weatherData }: Props) => {
    const weightData = await getSevenLastWeightReadings(user.id, hive.id);
    
    if (doesHiveWeightIncreaseSignificantly(weightData)) {
        logMessage('significant weight increase', user, hive);

        const message = notificationMessages(hive.name, NotificationType.ConsiderExpanding);
        await sendNotification({
            title: 'Significant Weight Increase Detected',
            body: message
        }).catch(error => console.log(`Error sending notification: ${error}`));

        const notification = createObject(hive.id, NotificationType.ConsiderExpanding, message);
        await notificationViewModel.addNotification(notification);
    }

    const weeklyTemperatures = getWeeklyTemperatureData(weatherData.weeklyForecast);
    if (areTemperaturesConsistentlyWarm(weeklyTemperatures)) {
        logMessage('warm trend', user, hive);
            
        const message = `Its getting warm around ${hive.name}. Consider expanding the hive.`;
        await sendNotification({
            title: 'Warm Trend Detected',
            body: message
        }).catch(error => console.log(`Error sending notification: ${error}`));
        
        const notification = createObject(hive.id, NotificationType.ConsiderExpanding, message);
        await notificationViewModel.addNotification(notification);
    }
  },

  considerFeeding: async ({ user, hive }: Props) => {
    const weightData = await getSevenLastWeightReadings(user.id, hive.id);

    if (doesHiveWeightDecreaseInEarlySpring(weightData)) {
      logMessage("considerFeeding", user, hive);
      
      const message = notificationMessages(hive.name, NotificationType.ConsiderFeeding, "spring");
      await sendNotification({
        title: 'Hive Weight Decrease In Early Spring',
        body: message
      }).catch(error => console.log(`Error in sending notification: ${error}`));

      const notification = createObject(hive.id, NotificationType.ConsiderFeeding, message);
      await notificationViewModel.addNotification(notification);
    }

    if (doesHiveWeightDecreaseInAutumn(weightData)) {
      logMessage("considerFeeding", user, hive)
      
      const message = notificationMessages(hive.name, NotificationType.ConsiderFeeding, "autumn");
        await sendNotification({
            title: 'Hive Weight Decrease In Autumn',
            body: message
        }).catch(error => console.log(`Error in sending notification: ${error}`));

      const notification = createObject(hive.id, NotificationType.ConsiderFeeding, message);
      await notificationViewModel.addNotification(notification);
    }
  },
  
  honeyHarvest: async ({ user, hive, weatherData}: Props) => {
        const dailyConditions = getDailyWeatherConditionsFromHourly(
          weatherData.dailyForecast,
          user.preferences.currentCountry
        );

        if (isIdealBeeWeatherBetweenEarlySpringAndEndAutumn(dailyConditions)) {
            logMessage('honeyHarvest', user, hive);

            const message = notificationMessages(hive.name, NotificationType.HoneyHarvest);
            await sendNotification({
                title: `Ideal Weather for Honey Harvest at ${hive.name}`,
                body: message
            }).catch(error => console.log(`Error in sending notification: ${error}`));

      const notification = createObject(hive.id, NotificationType.HoneyHarvest, message);
      await notificationViewModel.addNotification(notification);
    }
  },

  maintenance: async ({ user, hive, weatherData }: Props) => {
    const dailyConditions = getDailyWeatherConditionsFromHourly(
      weatherData.dailyForecast,
      user.preferences.currentCountry
    );

    if (isIdealBeeWeatherBetweenEarlySpringAndEndAutumn(dailyConditions)) {
      logMessage("maintenance", user, hive);

      const message = `Todays forecast provide perfect conditions for maintenance on hive: ${hive.name}`;
      await sendNotification({
        title: `Ideal weather for maintenance of hive: ${hive.name}`,
        body: message
      }).catch((error) => console.log(`Error in sending notification: ${error}`));

      const notification = createObject(hive.id, NotificationType.Maintenance, message);
      await notificationViewModel.addNotification(notification);
    }
  },

  possibleSwarm: async ({ user, hive }: Props) => {
    const weightData = await getSevenLastWeightReadings(user.id, hive.id);

    if (doesHiveWeightDecreaseSignificantly(weightData)) {
      logMessage("possibleSwarm", user, hive);

      const message = notificationMessages(hive.name, NotificationType.PossibleSwarm);
      await sendNotification({
        title: `Possible swarm in hive: ${hive.name}`,
        body: message
      }).catch((error) => console.log(`Error in sending notification: ${error}`));

      const notification = createObject(hive.id, NotificationType.PossibleSwarm, message);
      await notificationViewModel.addNotification(notification);
    }
  },

  weather: async ({ user, hive, weatherData }: Props) => {
    const weeklyTemperatures = getWeeklyTemperatureData(
      weatherData.weeklyForecast
    )
    if (areTemperaturesConsistentlyWarm(weeklyTemperatures)) {
      logMessage("warm trend", user, hive);
      
      const message = notificationMessages(hive.name, NotificationType.Weather);
      await sendNotification({
        title: 'Warm Trend Detected',
        body: message
      }).catch(error => console.log(`Error sending notification: ${error}`));

      const notification = createObject(hive.id, NotificationType.Weather, message);
      await notificationViewModel.addNotification(notification);
    }
        
    const weatherConditions = getWeatherConditions(
      weatherData.weeklyForecast,
      user.preferences.currentCountry
    );

    if (isSnowForecast(weatherConditions)) {
      logMessage('snow forecast', user, hive);
          
      const message = `Snow is forecasted around hive ${hive.name}.`;
      await sendNotification({
        title: 'Snow Forecast',
        body: message
      }).catch(error => console.log(`Error sending notification: ${error}`));

      const notification = createObject(hive.id, NotificationType.Weather, message);
      await notificationViewModel.addNotification(notification);
    }

    const dailyTemperature = getDailyTemperatureData(weatherData.dailyForecast)
    if (isWarmerEachDayInSpring(dailyTemperature)) {
      logMessage("warming trend in spring", user, hive)

      const message = `A warming trend in spring is detected for hive ${hive.name}`;
      await sendNotification({
        title: 'Warming Trend in Spring',
        body: message
      }).catch(error => console.log(`Error sending notification: ${error}`));

      const notification = createObject(hive.id, NotificationType.Weather, message);
      await notificationViewModel.addNotification(notification);
    }
  }
}

