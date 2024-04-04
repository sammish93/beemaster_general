import { HiveModel } from '@/models/hiveModel';
import { convertTemperature } from './measurementConverter';
import { TemperatureMeasurement } from "@/constants/Measurements";
import { snowSignificanceThreshold } from '@/constants/LocaleEnums';
import userViewModel from '@/viewModels/UserViewModel';


/**
 * Checks if the temperature is consistently warm over a specified number of days.
 * This function uses the user's temperature unit preference from the UserViewModel to interpret the forecast data.
 * 
 * @notification Weather - This function can trigger a 'Weather' notification when a period of consistent warmth is detected, which may require adjustments in hive management to ensure bee health.
 * @notification ConsiderExpanding - Additionally, a 'ConsiderExpanding' notification might be appropriate if the consistent warm temperatures suggest favorable conditions for hive growth or expansion.
 * @param forecast An array of temperature forecasts, representing daily temperatures.
 * @param numberOfDays The number of consecutive days to check for consistent warmth.
 * @returns True if the temperature is consistently above the threshold for the specified number of consecutive days, otherwise false.
 */

export const areTemperaturesConsistentlyWarm = (forecast: number[], numberOfDays: number): boolean => {
    let consecutiveWarmDays = 0;
    for (const temperature of forecast) {
        const temp = convertTemperature(temperature, TemperatureMeasurement.Celsius, userViewModel.temperaturePreference);

        if (temp >= userViewModel.thresholdTempWarm) {
            consecutiveWarmDays++;
            if (consecutiveWarmDays === numberOfDays) {
                return true;
            }
        } else {
            consecutiveWarmDays = 0;
        }
    }
    return false;
};


/**
 * Determines if temperatures are increasing each day throughout a sequence in spring.
 * This function uses the user's temperature unit preference from the UserViewModel to interpret the daily temperatures.
 * 
 * @notification Weather - This function can trigger a 'Weather' notification to highlight a warming trend in spring.
 * @notification ConsiderExpanding - A 'ConsiderExpanding' notification might also be triggered, suggesting that the favorable weather conditions and potential increase in bee activity could necessitate additional space for the hive.
 * @param temperatures An array of daily temperatures.
 * @returns True if each subsequent temperature is warmer than the last, indicating a warming trend in spring, otherwise false.
 */
export const isWarmerEachDayInSpring = (temperatures: number[]): boolean => {

    for (let i = 1; i < temperatures.length; i++) {
        const tempDay1 = convertTemperature(temperatures[i - 1], TemperatureMeasurement.Celsius, userViewModel.temperaturePreference);
        const tempDay2 = convertTemperature(temperatures[i], TemperatureMeasurement.Celsius, userViewModel.temperaturePreference);

        if (tempDay2 <= tempDay1) {
            return false;
        }
    }
    return true;
};


/**
 * Evaluates weather forecasts to determine if snow is expected based on user's location.
 * @notification Weather - This function can trigger a 'Weather' notification to alert users about the possibility of significant snowfall, allowing for timely preparations and adjustments.
 * @param forecast An array of string weather forecasts.
 * @returns True if the forecast includes significant snow keywords based on the user's current country in userViewModel, otherwise false.
 */
export const isSnowForecast = (forecast: string[]): boolean => {
    const country = userViewModel.currentCountry || 'NO';
    const significantSnowKeywords = snowSignificanceThreshold[country] || ['snow'];

    return forecast.some(forecastItem => significantSnowKeywords.some(significantSnowKeywords => forecastItem.includes(significantSnowKeywords)));
};

/**
 * Checks if the temperature in any of the provided hives exceeds a user-specified maximum temperature.
 * @notification Weather - Indicates when external temperature conditions may adversely affect hive conditions.
 * @notification CheckHive - Suggests an internal hive check might be necessary to prevent overheating.
 * @param hives An array of hive objects, each containing information about a single hive's conditions.
 * @param userViewModel An instance of IUserViewModel containing user-defined temperature preferences, including a maximum temperature parameter.
 * @returns True if any hive's temperature exceeds the maximum temperature parameter defined in the userViewModel, otherwise false.
 */
export const isHiveTooWarm = (hives: HiveModel[]): boolean => {
    for (const hive of hives) {
        if (hive.temperature && hive.temperature > (userViewModel.maxTempParamTooWarm ?? 0)) {
            return true;
        }
    }
    return false;
};


/**
 * Checks when a hive decreases in weight during early spring, based on user-defined parameters from UserViewModel.
 * This function is designed to trigger notifications for beekeepers to consider feeding their bees if significant weight loss is detected in the hive during early spring.
 * It compares daily hive weights against a threshold for significant weight decrease, using the early spring start and end months defined in the user's preferences.
 * 
 * @notification ConsiderFeeding - This function can trigger a 'ConsiderFeeding' notification when a significant weight decrease is detected in the early spring.
 * @param weights Array of daily hive weights.
 * @returns A boolean indicating whether the hive decreases in weight significantly during early spring, as defined by the user. This function uses the threshold for significant weight decrease, early spring start month, and end month from the user's preferences in UserViewModel.
 */
export const doesHiveWeightDecreaseInEarlySpring = (weights: number[]): boolean => {
    const { thresholdWeightDecreaseEarlySpring, earlySpringStartMonth, earlySpringEndMonth } = userViewModel;
    const currentMonth = new Date().getMonth();
    const startMonth = earlySpringStartMonth.getMonth();
    const endMonth = earlySpringEndMonth.getMonth();

    if (currentMonth >= startMonth && currentMonth <= endMonth) {
        for (let i = 1; i < weights.length; i++) {
            const weightDecrease = weights[i - 1] - weights[i];
            if (weightDecrease >= thresholdWeightDecreaseEarlySpring) {
                return true;
            }
        }
    }
    return false;
};


/**
 * Determines if the weight of a hive decreases significantly during the autumn months. 
 * This function supports the beekeeping management process by signaling when bees might need additional feeding to prepare for winter. 
 * 
 * @notification ConsiderFeeding - Triggers a 'ConsiderFeeding' notification if a significant decrease in hive weight is detected during the autumn, suggesting that bees may require additional feeding.
 * @param weights An array of numbers representing the recorded weights of the hive over time.
 * @returns A boolean value indicating whether the weight of the hive decreases significantly during the autumn period.
 */
export const doesHiveWeightDecreaseInAutumn = (weights: number[]): boolean => {
    const thresholdWeightDecreaseInAutumn = userViewModel.thresholdWeightDecreaseInAutumn;
    const { autumnStartMonth, autumnEndMonth } = userViewModel;
    const currentMonth = new Date().getMonth();
    const startMonth = autumnStartMonth.getMonth();
    const endMonth = autumnEndMonth.getMonth();

    if (currentMonth >= startMonth && currentMonth <= endMonth) {
        for (let i = 1; i < weights.length; i++) {
            const weightDecrease = weights[i - 1] - weights[i];
            if (weightDecrease >= thresholdWeightDecreaseInAutumn) {
                return true;
            }
        }
    }
    return false;
};


/**
 * Checks if there is a snow forecast during the autumn months.
 * 
 * @notification Weather - Triggers a 'Weather' notification if snow is forecasted during the autumn, highlighting the need for physical preparations to protect the hives.
 * @notification ConsiderFeeding - Additionally triggers a 'ConsiderFeeding' notification if snow is forecasted, indicating the need to assess and possibly supplement the hive's food supply in expectation of restricted foraging opportunities.
 * @param weatherConditions An array of objects, each containing a `date` (as a Date object) and a `forecast` string.
 * @returns A boolean value indicating whether snow is forecasted during the autumn period.
 */
export const isSnowForecastInAutumn = (weatherConditions: { date: Date; forecast: string }[]): boolean => {
    const { autumnStartMonth, autumnEndMonth } = userViewModel;
    const currentMonth = new Date().getMonth();
    const startMonth = autumnStartMonth.getMonth();
    const endMonth = autumnEndMonth.getMonth();
    if (currentMonth >= startMonth && currentMonth <= endMonth) {
        return weatherConditions.some(condition =>
            condition.forecast.includes('snow') &&
            condition.date.getMonth() + 1 >= startMonth &&
            condition.date.getMonth() + 1 <= endMonth
        );
    }
    return false;
};


/**
 * Determines if the recorded number of bee exits from the hive is consistently low.
 * @notification PossibleSwarm - Triggers a 'PossibleSwarm' notification if it looks like the bees might start swarming.
 * @notification ConsiderFeeding - Triggers a 'ConsiderFeeding' notification if low bee exits could indicate a lack of foraging success, suggesting the need to assess and possibly supplement the hive's food supply.
 *
 * @param beeExits An array of numbers, each representing the count of bee exits during a given period.
 * @returns A boolean value indicating whether the bee exits have consistently been below a specified threshold.
 */
export const haveFewBeesExited = (beeExits: number[]): boolean => {
    const thresholdExitCount = userViewModel.thresholdExitCountLow;

    return beeExits.every(exitCount => exitCount <= thresholdExitCount);
};


/**
 * Function for checking if strong winds are forecast based on user-defined threshold.
 * @notification Weather - Triggers a 'Weather' notification when forecasted wind speeds meet or exceed the user-defined threshold for strong winds. 
 * @param forecast Array of wind speed forecasts.
 * @returns A boolean indicating whether strong winds are forecast.
 */
export const areStrongWindsForecast = (forecast: number[]): boolean => {
    const thresholdWindSpeed = userViewModel.thresholdWindSpeedStrong;

    return forecast.some(windSpeed => windSpeed >= thresholdWindSpeed);
};

/**
 * Determines if 'snow' is forecasted during specific seasons (autumn, early winter, and early spring) based on the current month.
 * This function checks if the array of weather conditions contains 'snow' and then verifies if the current month
 * falls within the predefined months for autumn, early winter, or early spring as specified in the userViewModel.
 *  
 * @notification Weather - Triggers a 'Weather' notification when snow is forecasted during the specified seasons of autumn, early winter, or early spring.
 * @param weatherConditions An array of strings, each representing a forecast description.
 * @returns True if the current date falls within the specified seasons (autumn, early winter, 
 * or early spring) and 'snow' is included in the weather conditions. False otherwise.
 */
export const isSnowForecastInSpecificSeasons = (weatherConditions: string[]): boolean => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    if (!weatherConditions.includes('snow')) {
        return false;
    }

    const isWithinSeason = (seasonMonths: Date[]) => seasonMonths.some(seasonDate =>
        seasonDate.getMonth() === currentMonth && seasonDate.getFullYear() === currentYear
    );
    return isWithinSeason(userViewModel.autumnMonths) ||
        isWithinSeason(userViewModel.earlyWinterMonths) ||
        isWithinSeason(userViewModel.earlySpringMonths);
};


/**
 * Function for checking if a drought is forecast based on user's location.
 * 
 * @notification Weather - Triggers a 'Weather' notification when 'drought' is detected in the forecast for the user's current country.
 * @notification ConsiderFeeding - In addition, triggers a 'ConsiderFeeding' notification for beekeepers, indicating that supplementary feeding may be necessary due to reduced availability of natural food sources for bees during drought conditions.
 *
 * @param weatherConditions Array of objects, each representing a weather forecast description and the country it applies to.
 * 
 * @returns A boolean indicating whether a drought is forecast in the user's current country.
 */
export const isDroughtForecast = (weatherConditions: { forecast: string; country: string }[]): boolean => {
    const userCountry = userViewModel.currentCountry || 'NO';
    return weatherConditions.some(condition =>
        condition.forecast.includes('drought') && condition.country === userCountry);
};



//MAINTENANCE 
/**
 * Function to check for warm and/or dry days with low wind speed between early spring and late autumn.
 *   
 * @notification Weather - Indicates a notable weather pattern that might impact bee activity and hive conditions.
 * @notification Maintenance - Suggests that the weather conditions are ideal for performing hive maintenance.
 * @notification ConsiderFeeding - Indicates that supplementary feeding may be necessary if the warm, dry conditions persist and natural food sources become scarce.
 *
 * @param weatherConditions Array of objects representing daily weather conditions.
 * @returns A boolean indicating whether the conditions meet the criteria.
 */
export const isWarmDryLowWindDay = (
    weatherConditions: {
        temperature: number;
        humidity: number;
        windSpeed: number
    }[],
): boolean => {
    const currentMonth = new Date().getMonth();

    const earlySpringStartMonth = userViewModel.earlySpringStartMonth.getMonth();
    const autumnEndMonth = userViewModel.autumnEndMonth.getMonth();

    const thresholdWindSpeedLow = userViewModel.thresholdWindSpeedLow;
    const thresholdTempWarm = userViewModel.thresholdTempWarm;
    const humidityThreshold = userViewModel.humidityThreshold;

    if (currentMonth >= earlySpringStartMonth && currentMonth <= autumnEndMonth) {
        return weatherConditions.some(condition =>
            condition.temperature >= thresholdTempWarm &&
            condition.humidity <= humidityThreshold &&
            condition.windSpeed <= thresholdWindSpeedLow
        );
    }
    return false;
};



/**
 * Function to check for warm, dry days with low wind speed between summer and early autumn.
 * 
 * @notification Maintenance - Suggests optimal conditions for performing hive maintenance.
 * @notification HoneyHarvest - Indicates ideal conditions for honey harvesting due to the stable and favorable weather, potentially leading to a successful and efficient harvest.
 * @param weatherConditions Array of objects representing daily weather conditions.
 * @returns A boolean indicating whether the conditions meet the criteria for a warm, dry day with low wind speed in the specified period.
 */
export const isWarmDryLowWindDayBetweenSummerAndEarlyAutumn = (
    weatherConditions: { temperature: number; humidity: number; windSpeed: number }[],
): boolean => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();

    const humidityThreshold = userViewModel.humidityThreshold;
    const thresholdTempWarm = userViewModel.thresholdTempWarm;
    const thresholdWindSpeedLow = userViewModel.thresholdWindSpeedLow;
    const summerStartMonth = userViewModel.summerStartMonth.getMonth();
    const earlyAutumnMonth = userViewModel.earlyAutumnMonth.getMonth();

    if (currentMonth >= summerStartMonth && currentMonth <= earlyAutumnMonth) {
        return weatherConditions.some(condition =>
            condition.temperature >= thresholdTempWarm &&
            condition.humidity <= humidityThreshold &&
            condition.windSpeed <= thresholdWindSpeedLow
        );
    }
    return false;
};


/**
 * Function for checking if hive weight increases significantly based on user-defined threshold.
 * 
 * @notification ConsiderExpanding - Indicates that the hive may be becoming too crowded due to a significant increase in weight. 
 * @param weights Array of daily hive weights.
 * @returns A boolean indicating whether there's a significant increase in hive weight.
 */
export const doesHiveWeightIncreaseSignificantly = (weights: number[]): boolean => {
    for (let i = 1; i < weights.length; i++) {
        const weightIncrease = weights[i] - weights[i - 1];
        if (weightIncrease >= userViewModel.thresholdWeightIncrease) {
            return true;
        }
    }
    return false;
};


/**
 * Function for checking if hive temperature increases or decreases drastically in short time.
 * 
 * @notification CheckHive - Triggers a 'CheckHive' notification when a drastic temperature change is detected.
 * @param temperatures Array of daily hive temperatures.
 * @returns A boolean indicating whether there's a drastic increase or decrease in temperature in a short time.
 */
export const isTemperatureChangeDrastic = (temperatures: number[]): boolean => {
    for (let i = 1; i < temperatures.length; i++) {
        const tempChange = Math.abs(temperatures[i] - temperatures[i - 1]);
        if (tempChange > userViewModel.thresholdMaxTempChangeInHive) {
            return true;
        }
    }
    return false;
};


/**
 * Function for checking if humidity increases or decreases drastically in short time.
 * 
 * @notification CheckHive - Triggers a 'CheckHive' notification when a drastic change in humidity is detected, advising beekeepers to inspect the hive. 
 * @param humidities Array of daily humidity values.
 * @returns A boolean indicating whether there's a drastic increase or decrease in humidity in a short time.
 */
export const isHumidityChangeDrastic = (humidities: number[]): boolean => {
    for (let i = 1; i < humidities.length; i++) {
        const humidityChange = Math.abs(humidities[i] - humidities[i - 1]);
        if (humidityChange > userViewModel.thresholdMaxHumidityChangeInHive) {
            return true;
        }
    }
    return false;
};


/**
 * Function for checking the risk of swarming based on user-defined periods for late spring and early summer.
 * 
 * @notification PossibleSwarm - Indicates that conditions suggestive of an upcoming swarm have been detected.
 * @notification CheckHive - Advises beekeepers to perform detailed hive inspections upon detecting signs of potential swarming.
 * @param queenCuppingDetected Boolean indicating if queen cupping has been detected.
 * @param congregationAtEntranceDetected Boolean indicating if there is congregation at the entrance.
 * @returns A boolean indicating whether there is a risk of swarming based on the user-defined season.
 */
export const isSwarmingRiskBasedOnUserDefinedSeason = (
    queenCuppingDetected: boolean,
    congregationAtEntranceDetected: boolean
): boolean => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();

    if (
        currentMonth >= userViewModel.lateSpringStartMonth.getMonth() &&
        currentMonth <= userViewModel.earlySummerEndMonth.getMonth() &&
        (queenCuppingDetected || congregationAtEntranceDetected)
    ) {
        return true;
    }
    return false;
};


/**
 * Function for checking if hive weight decreases significantly based on user-defined threshold.
 * 
 * @notification PossibleSwarm - Triggers a 'PossibleSwarm' notification if a significant decrease in weight is observed, signaling the beekeeper to inspect the hive for signs of swarming.
 * @param weights Array of daily hive weights.
 * @returns A boolean indicating whether there's a significant decrease in hive weight.
 */
export const doesHiveWeightDecreaseSignificantly = (weights: number[]): boolean => {
    for (let i = 1; i < weights.length; i++) {
        const weightDecrease = weights[i - 1] - weights[i];
        if (weightDecrease >= userViewModel.thresholdWeightDecreaseSwarm) {
            return true;
        }
    }
    return false;
};


/**
 * Function for checking if a significant number of bees have been exiting the hive.
 * 
 * @notification PossibleSwarm - Alerts to the possibility of swarming activity.
 * @param beeExits Array of numbers representing the count of bees exiting the hive over a series of observations.
 * @returns A boolean indicating whether a significant number of bees have been exiting the hive.
 */
export const haveLotsOfBeesExited = (beeExits: number[]): boolean => {
    for (const exitCount of beeExits) {
        if (exitCount >= userViewModel.thresholdExitCountHigh) {
            return true;
        }
    }
    return false;
};



interface BeekeepingReminder {
    date: Date;
    task: string;
    description: string;
}

/**
 * Function to create a reminder for a beekeeping task.
 * 
 * @notification CustomReminder - Generates a 'CustomReminder' for beekeeping tasks, facilitating task management and ensuring timely execution of critical beekeeping activities.
 * @param reminders Array of existing reminders.
 * @param date The date for the reminder.
 * @param task The task for which the reminder is set.
 * @param description A description of the task or reminder.
 * @returns An updated array of reminders including the new reminder.
 */
export const createBeekeepingReminder = (
    reminders: BeekeepingReminder[],
    date: Date,
    task: string,
    description: string
): BeekeepingReminder[] => {
    const newReminder: BeekeepingReminder = { date, task, description };
    reminders.push(newReminder);
    return reminders;
};



/**
 * Filters and returns reminders for a given date from an array of beekeeping reminders.
 * Useful for organizing daily beekeeping tasks by showing only the reminders relevant for a specific date,
 * aiding beekeepers in focusing on and preparing for the day's activities.
 * 
 * @param reminders Array of reminders.
 * @param date The date for which to display reminders.
 * @returns An array of reminders for the specified date.
 */
export const getRemindersForDate = (
    reminders: BeekeepingReminder[],
    date: Date
): BeekeepingReminder[] => {
    return reminders.filter(reminder => reminder.date.toDateString() === date.toDateString());
};

