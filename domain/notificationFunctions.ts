import { HiveModel } from '@/models/hiveModel';
import { convertTemperature } from './measurementConverter';
import { TemperatureMeasurement } from "@/constants/Measurements";
import { snowSignificanceThreshold } from '@/constants/LocaleEnums';
import userViewModel from '@/viewModels/UserViewModel';

/**
 * Checks if the temperature is consistently warm over a specified number of days.
 * This function uses the user's temperature unit preference from the UserViewModel to interpret the forecast data.
 * 
 * @param forecast An array of temperature forecasts, representing daily temperatures.
 * @param numberOfDays The number of consecutive days to check for consistent warmth.
 * @returns True if the temperature is consistently above the threshold for the specified number of consecutive days, otherwise false.
 */

export const areTemperaturesConsistentlyWarm = (forecast: number[], numberOfDays: number): boolean => {
    let consecutiveWarmDays = 0;
    for (const temperature of forecast) {
        const temp = convertTemperature(temperature, TemperatureMeasurement.Celsius, userViewModel.temperaturePreference);

        if (temp >= userViewModel.thresholdTemp) {
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
 * 
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
 * 
 * @param hives An array of hive objects, each containing information about a single hive's conditions.
 * @param userViewModel An instance of IUserViewModel containing user-defined temperature preferences, including a maximum temperature parameter.
 * @returns True if any hive's temperature exceeds the maximum temperature parameter defined in the userViewModel, otherwise false.
 */
export const isHiveTooWarm = (hives: HiveModel[]): boolean => {
    for (const hive of hives) {
        if (hive.currentTemp > (userViewModel.maxTempParam ?? 0)) {
            return true;
        }
    }
    return false;
};



//CONSIDER FEEDING 
/**
 * Function to check when a hive decreases in weight and it's early spring, based on user-defined parameters from UserViewModel.
 * 
 * @param weights Array of daily hive weights.
 * @returns A boolean indicating whether the hive decreases in weight significantly during early spring, as defined by the user. This function uses the threshold for significant weight decrease, early spring start month, and end month from the user's preferences in UserViewModel.
 */
export const doesHiveWeightDecreaseInEarlySpring = (weights: number[]): boolean => {
    const { thresholdWeightDecrease, earlySpringStartMonth, earlySpringEndMonth } = userViewModel;
    const currentMonth = new Date().getMonth() + 1;

    if (currentMonth >= earlySpringStartMonth && currentMonth <= earlySpringEndMonth) {
        for (let i = 1; i < weights.length; i++) {
            const weightDecrease = weights[i - 1] - weights[i];
            if (weightDecrease >= thresholdWeightDecrease) {
                return true;
            }
        }
    }
    return false;
};


/**
 * Determines if the weight of a hive decreases significantly during the autumn months.
 * @param weights An array of numbers representing the recorded weights of the hive over time.
 * @returns A boolean value indicating whether the weight of the hive decreases significantly during the autumn period.
 */
export const doesHiveWeightDecreaseInAutumn = (weights: number[]): boolean => {
    const thresholdWeightDecrease = userViewModel.thresholdWeightDecrease;
    const autumnStartMonth = userViewModel.autumnStartMonth;
    const autumnEndMonth = userViewModel.autumnEndMonth;
    const currentMonth = new Date().getMonth() + 1;
    if (currentMonth >= autumnStartMonth && currentMonth <= autumnEndMonth) {
        for (let i = 1; i < weights.length; i++) {
            const weightDecrease = weights[i - 1] - weights[i];
            if (weightDecrease >= thresholdWeightDecrease) {
                return true;
            }
        }
    }
    return false;
};


/**
 * Checks if there is a snow forecast during the autumn months.
 * @param weatherConditions An array of objects, each containing a `date` (as a Date object) and a `forecast` string.
 * @returns A boolean value indicating whether snow is forecasted during the autumn period.
 */
export const isSnowForecastInAutumn = (weatherConditions: { date: Date; forecast: string }[]): boolean => {
    const autumnStartMonth = userViewModel.autumnStartMonth;
    const autumnEndMonth = userViewModel.autumnEndMonth;
    const currentMonth = new Date().getMonth() + 1;

    if (currentMonth >= autumnStartMonth && currentMonth <= autumnEndMonth) {
        return weatherConditions.some(condition =>
            condition.forecast.includes('snow') &&
            condition.date.getMonth() + 1 >= autumnStartMonth &&
            condition.date.getMonth() + 1 <= autumnEndMonth
        );
    }
    return false;
};

/**
 * Determines if the recorded number of bee exits from the hive is consistently low.
 * @param beeExits An array of numbers, each representing the count of bee exits during a given period.
 * @returns A boolean value indicating whether the bee exits have consistently been below a specified threshold.
 */
export const haveFewBeesExited = (beeExits: number[]): boolean => {
    const thresholdExitCount = userViewModel.thresholdExitCount;

    return beeExits.every(exitCount => exitCount <= thresholdExitCount);
};



//WEATHER 
/**
 * Function for checking if strong winds are forecast based on user-defined threshold.
 * @param forecast Array of wind speed forecasts.
 * @returns A boolean indicating whether strong winds are forecast.
 */
export const areStrongWindsForecast = (forecast: number[]): boolean => {
    const thresholdWindSpeed = userViewModel.thresholdWindSpeed;

    return forecast.some(windSpeed => windSpeed >= thresholdWindSpeed);
};



/**
 * Determines if 'snow' is forecasted during specific seasons (autumn, early winter, and early spring) based on the current month.
 * This function checks if the array of weather conditions contains 'snow' and then verifies if the current month
 * falls within the predefined months for autumn, early winter, or early spring as specified in the userViewModel.
 * @param weatherConditions An array of strings, each representing a forecast description.
 * @returns A boolean value indicating whether snow is forecasted during the specified seasons based on the current month.
 */
export const isSnowForecastInSpecificSeasons = (weatherConditions: string[]): boolean => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    if (weatherConditions.includes('snow')) {
        if (userViewModel.autumnMonths.includes(currentMonth) || userViewModel.earlyWinterMonths.includes(currentMonth) || userViewModel.earlySpringMonths.includes(currentMonth)) {
            return true;
        }
    }
    return false;
};


/**
 * Function for checking if a drought is forecast.
 * @param weatherConditions Array of weather conditions forecasts.
 * @returns A boolean indicating whether a drought is forecast.
 */
export const isDroughtForecast = (weatherConditions: string[]): boolean => {
    return weatherConditions.includes('drought');
};



//MAINTENANCE 
/**
 * Function to check for warm and/or dry days with low wind speed between early spring and late autumn.
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
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const earlySpringStartMonth = userViewModel.earlySpringStartMonth;
    const autumnEndMonth = userViewModel.autumnEndMonth;
    const thresholdWindSpeed = userViewModel.thresholdWindSpeed;
    const thresholdTemp = userViewModel.thresholdTemp;
    const humidityThreshold = userViewModel.humidityThreshold;

    if (currentMonth >= earlySpringStartMonth && currentMonth <= autumnEndMonth) {
        return weatherConditions.some(condition =>
            condition.temperature >= thresholdTemp &&
            condition.humidity <= humidityThreshold &&
            condition.windSpeed <= thresholdWindSpeed
        );
    }
    return false;
};


//HONEY HARVEST 
/**
 * Function to check for warm, dry days with low wind speed between summer and early autumn.
 * @param weatherConditions Array of objects representing daily weather conditions.
 * @returns A boolean indicating whether the conditions meet the criteria for a warm, dry day with low wind speed in the specified period.
 */
export const isWarmDryLowWindDayBetweenSummerAndEarlyAutumn = (
    weatherConditions: { temperature: number; humidity: number; windSpeed: number }[],
): boolean => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const humidityThreshold = userViewModel.humidityThreshold;
    const thresholdTemp = userViewModel.thresholdTemp;
    const thresholdWindSpeed = userViewModel.thresholdWindSpeed;
    const summerStartMonth = userViewModel.summerStartMonth;
    const earlyAutumnMonth = userViewModel.earlyAutumnMonth;

    if (currentMonth >= summerStartMonth && currentMonth <= earlyAutumnMonth) {
        return weatherConditions.some(condition =>
            condition.temperature >= thresholdTemp &&
            condition.humidity <= humidityThreshold &&
            condition.windSpeed <= thresholdWindSpeed
        );
    }
    return false;
};



//EXPAND HIVE 
/**
 * Function for checking if hive weight increases significantly based on user-defined threshold.
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




//CHECK HIVE 
/**
 * Function for checking if hive temperature increases or decreases drastically in short time.
 * @param temperatures Array of daily hive temperatures.
 * @returns A boolean indicating whether there's a drastic increase or decrease in temperature in a short time.
 */
export const isTemperatureChangeDrastic = (temperatures: number[]): boolean => {
    for (let i = 1; i < temperatures.length; i++) {
        const tempChange = Math.abs(temperatures[i] - temperatures[i - 1]);
        if (tempChange > userViewModel.thresholdMaxTempChange) {
            return true;
        }
    }
    return false;
};

/**
 * Function for checking if humidity increases or decreases drastically in short time.
 * @param humidities Array of daily humidity values.
 * @returns A boolean indicating whether there's a drastic increase or decrease in humidity in a short time.
 */
export const isHumidityChangeDrastic = (humidities: number[]): boolean => {
    for (let i = 1; i < humidities.length; i++) {
        const humidityChange = Math.abs(humidities[i] - humidities[i - 1]);
        if (humidityChange > userViewModel.thresholdMaxHumidityChange) {
            return true;
        }
    }
    return false;
};

/**
 * Function for checking the risk of swarming based on user-defined periods for late spring and early summer.
 * @param queenCuppingDetected Boolean indicating if queen cupping has been detected.
 * @param congregationAtEntranceDetected Boolean indicating if there is congregation at the entrance.
 * @returns A boolean indicating whether there is a risk of swarming based on the user-defined season.
 */
export const isSwarmingRiskBasedOnUserDefinedSeason = (
    queenCuppingDetected: boolean,
    congregationAtEntranceDetected: boolean
): boolean => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    if (
        currentMonth >= userViewModel.lateSpringStartMonth &&
        currentMonth <= userViewModel.earlySummerEndMonth &&
        (queenCuppingDetected || congregationAtEntranceDetected)
    ) {
        return true;
    }
    return false;
};




//POSSIBLE SWARM 
/**
 * Function for checking if hive weight decreases significantly based on user-defined threshold.
 * @param weights Array of daily hive weights.
 * @returns A boolean indicating whether there's a significant decrease in hive weight.
 */
export const doesHiveWeightDecreaseSignificantly = (weights: number[]): boolean => {
    for (let i = 1; i < weights.length; i++) {
        const weightDecrease = weights[i - 1] - weights[i];
        if (weightDecrease >= userViewModel.thresholdWeightDecrease) {
            return true;
        }
    }
    return false;
};


/**
 * Function for checking if a significant number of bees have been exiting the hive.
 * @param beeExits Array of numbers representing the count of bees exiting the hive over a series of observations.
 * @returns A boolean indicating whether a significant number of bees have been exiting the hive.
 */
export const haveLotsOfBeesExited = (beeExits: number[]): boolean => {
    for (const exitCount of beeExits) {
        if (exitCount >= userViewModel.thresholdExitCount) {
            return true;
        }
    }
    return false;
};





//REMINDER //TODO:Se over denne, om det er riktig tenkt.
interface BeekeepingReminder {
    date: Date;
    task: string;
    description: string;
}

/**
 * Function to create a reminder for a beekeeping task.
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
 * Function to display reminders for a specific date.
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

