import notificationViewModel from "@/viewModels/NotificationViewModel"
import { HiveNotification, User } from "@/models"
import { HiveModel } from "@/models/hiveModel";
import { NotificationType } from "@/constants/Notifications"
import { sendNotification } from "./sendNotification"
import {
  areTemperaturesConsistentlyWarm,
  doesHiveWeightIncreaseSignificantly,
  isSnowForecast,
  isWarmerEachDayInSpring,
  doesHiveWeightDecreaseInEarlySpring,
  doesHiveWeightDecreaseInAutumn,
} from "@/domain/notificationFunctions"
import {
  getDailyHumidityData,
  getDailyTemperatureData,
  getDailyWeatherConditionsFromHourly,
  getWeatherConditions,
  getWeeklyTemperatureData,
} from "../weather/weatherDataProcessor"
import { createNotificationObject, logMessage, notificationMessages } from "./notificationHelpers"
import { WeatherData } from "@/models/weatherModel"

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
    const dailyTemperatures = getDailyTemperatureData(weatherData.dailyForecast)
    const dailyHumidities = getDailyHumidityData(weatherData.dailyForecast)

    if (areTemperaturesConsistentlyWarm(dailyTemperatures) || isWarmerEachDayInSpring(dailyTemperatures)) {
      logMessage("checkHive", user, hive)

      const message = notificationMessages(hive.name, NotificationType.CheckHive);
      await sendNotification({
        title: `Check Your Hive: ${hive.name}`,
        body: message,
      }).catch((error) => console.log(`Error sending notification: ${error}`));
 
      const notification = createNotificationObject(hive.id, NotificationType.CheckHive, message);
      await notificationViewModel.addNotification(notification); 
    }
  },
  
  considerExpanding: async ({ user, hive, weatherData }: Props) => {
    
    // TODO: Swap with real values from db.
    const dailyHiveWeights = [150, 152, 154, 155, 156];
    
    if (doesHiveWeightIncreaseSignificantly(dailyHiveWeights)) {
        logMessage('significant weight increase', user, hive);

        const message = `Weight of hive: ${hive.name} has increased significantly, consider expanding!`;
        await sendNotification({
            title: 'Significant Weight Increase Detected',
            body: notificationMessages
        }).catch(error => console.log(`Error sending notification: ${error}`));

      const notificationToStoreInDB = createNotificationObject(
        hive.id,
        NotificationType.ConsiderExpanding,
        message
      )
    }

    const weeklyTemperatures = getWeeklyTemperatureData(weatherData.weeklyForecast);
    if (areTemperaturesConsistentlyWarm(weeklyTemperatures)) {
        logMessage('warm trend', user, hive);
            
        const message = `Its getting warm around ${hive.name}. Consider expanding the hive.`;
        await sendNotification({
            title: 'Warm Trend Detected',
            body: message
        }).catch(error => console.log(`Error sending notification: ${error}`));
        
        const notificationToStoreInDB = createNotificationObject(
            hive.id,
            NotificationType.ConsiderExpanding,
            message
        )

        // TODO: Store in DB.
    }
  },

  considerFeeding: async ({ user, hive }: Props) => {
    // TODO: Swap with real values from db.
    const hiveWeights = [150, 156, 159, 180]

    if (doesHiveWeightDecreaseInEarlySpring(hiveWeights)) {
      logMessage("considerFeeding", user, hive)

            const message = `Weight of hive: ${hive.name} has decreased significantly this early spring. It might be a good time to consider feeding your bees.`;
            await sendNotification({
                title: 'Hive Weight Decrease In Early Spring',
                body: message
            }).catch(error => console.log(`Error in sending notification: ${error}`));

      const notificationToStoreInDB = createNotificationObject(
        hive.id,
        NotificationType.ConsiderFeeding,
        message
      )

      // TODO: Store in DB.
    }

    if (doesHiveWeightDecreaseInAutumn(hiveWeights)) {
      logMessage("considerFeeding", user, hive)
      
      const message = `Weight of hive: ${hive.name} has decreased significantly this autumn. It might be a good time to consider feeding your bees.`;
        await sendNotification({
            title: 'Hive Weight Decrease In Autumn',
            body: message
        }).catch(error => console.log(`Error in sending notification: ${error}`));

      const notificationToStoreInDB = createNotificationObject(
        hive.id,
        NotificationType.ConsiderFeeding,
        message
      )

      // TODO: Store in DB.
    }
  },

  customReminder: async ({ user, hive, weatherData }: Props) => {
    logMessage("customReminder", user, hive)

    // Gonna add 'createBeekeepingReminder' here.
  },
  
  honeyHarvest: async ({ user, hive, weatherData}: Props) => {
    
        const dailyWeatherConditions = getDailyWeatherConditionsFromHourly(weatherData.dailyForecast);
        if (isWarmDryLowWindDayBetweenSummerAndEarlyAutumn(dailyWeatherConditions)) {
            logMessage('honeyHarvest', user, hive);

            const message = `Today's forecast promises perfect conditions for honey harvesting at ${hive.name} with warm temperatures, low humidity, and gentle breezes.`;
            await sendNotification({
                title: `Ideal Weather for Honey Harvest at ${hive.name}`,
                body: message
            }).catch(error => console.log(`Error in sending notification: ${error}`));

      const notificationToStoreInDB = createNotificationObject(
        hive.id,
        NotificationType.HoneyHarvest,
        message
      )

      // TODO: Store in DB.
    }
  },

  maintenance: async ({ user, hive, weatherData }: Props) => {
    logMessage("maintenance", user, hive)

    // Gonna add 'isWarmDryLowWindDay'
    // and 'isWarmDryLowWindDayBetweenSummerAndEarlyAutumn' here.
  },

  possibleSwarm: async ({ user, hive, weatherData }: Props) => {
    logMessage("possibleSwarm", user, hive)

    // Gonna add 'haveFewBeesExited', 'isSwarmingRiskBasedOnUserDefinedSeason'
    // and 'doesHiveWeightDecreaseSignificantly' here.
  },

  weather: async ({ user, hive, weatherData }: Props) => {
    const weeklyTemperatures = getWeeklyTemperatureData(
      weatherData.weeklyForecast
    )
    if (areTemperaturesConsistentlyWarm(weeklyTemperatures)) {
      logMessage("warm trend", user, hive)

            const message = `Its getting warm around ${hive.name}. Consider checking it out.`;
            await sendNotification({
                title: 'Warm Trend Detected',
                body: message
            }).catch(error => console.log(`Error sending notification: ${error}`));

      const notificationToStoreInDB = createNotificationObject(
        hive.id,
        NotificationType.Weather,
        message
      )

            // TODO: Store in DB.
        }
        
        const weatherConditions = getWeatherConditions(weatherData.weeklyForecast);
        if (isSnowForecast(weatherConditions)) {
            logMessage('snow forecast', user, hive);
            
            const message = `Snow is forecasted around hive ${hive.name}.`;
            await sendNotification({
                title: 'Snow Forecast',
                body: message
            }).catch(error => console.log(`Error sending notification: ${error}`));

      const notificationToStoreInDB = createNotificationObject(
        hive.id,
        NotificationType.Weather,
        message
      )

      // TODO: Store in DB.
    }

    const dailyTemperature = getDailyTemperatureData(weatherData.dailyForecast)
    if (isWarmerEachDayInSpring(dailyTemperature)) {
      logMessage("warming trend in spring", user, hive)

            const message = `A warming trend in spring is detected for hive ${hive.name}`;
            await sendNotification({
                title: 'Warming Trend in Spring',
                body: message
            }).catch(error => console.log(`Error sending notification: ${error}`));

      const notificationToStoreInDB = createNotificationObject(
        hive.id,
        NotificationType.Weather,
        message
      )

      // TODO: Store in DB.
    }
  },
}

