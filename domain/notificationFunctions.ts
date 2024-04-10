import { HiveModel } from '@/models/hiveModel';
import { convertTemperature } from './measurementConverter';
import { TemperatureMeasurement } from "@/constants/Measurements";
import userViewModel from '@/viewModels/UserViewModel';


/**
 * Checks if the temperature is consistently warm over a specified number of days.
 * This function uses the user's temperature unit preference from the UserViewModel to interpret the forecast data.
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

        if (temp >= userViewModel.thresholdTemperatureMax) {
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
 * Checks if the temperature in any of the provided hives exceeds a user-specified maximum temperature.
 * @notification Weather - Indicates when external temperature conditions may adversely affect hive conditions.
 * @notification CheckHive - Suggests an internal hive check might be necessary to prevent overheating.
 * @param hives An array of hive objects, each containing information about a single hive's conditions.
 * @returns True if any hive's temperature exceeds the maximum temperature parameter defined in the userViewModel, otherwise false.
 */
export const isHiveTooWarm = (hives: HiveModel[]): boolean => {
    for (const hive of hives) {
        if (hive.temperature && hive.temperature > (userViewModel.thresholdMaxTempInHive)) {
            return true;
        }
    }
    return false;
};


/**
 * Checks if the temperature in any of the provided hives falls below a user-specified minimum temperature.
 * @notification Weather - Indicates when external temperature conditions may adversely affect hive conditions by making them too cold.
 * @notification CheckHive - Suggests an internal hive check might be necessary to ensure adequate warmth for the colony's survival.
 * @param hives An array of hive objects, each containing information about a single hive's conditions.
 * @returns True if any hive's temperature falls below the minimum temperature parameter defined in the userViewModel, otherwise false.
 */
export const isHiveTooCold = (hives: HiveModel[]): boolean => {
    for (const hive of hives) {
        if (hive.temperature && hive.temperature < (userViewModel.thresholdMinTempInHive)) {
            return true;
        }
    }
    return false;
};


/**
 * Checks when any of the hives decreases in weight during early spring, based on user-defined parameters from UserViewModel.
 * This function is designed to trigger notifications for beekeepers to consider feeding their bees if significant weight loss is detected in any of the hives during early spring.
 * It compares daily hive weights against a threshold for significant weight decrease, using the early spring start and end months defined in the user's preferences.
 * 
 * @notification ConsiderFeeding - This function can trigger a 'ConsiderFeeding' notification when a significant weight decrease is detected in the early spring.
 * @param hives Array of HiveModel objects, each containing information about a single hive's conditions.
 * @returns A boolean indicating whether any hive decreases in weight significantly during early spring, as defined by the user. This function uses the threshold for significant weight decrease, early spring start month, and end month from the user's preferences in UserViewModel.
 */
export const doesHiveWeightDecreaseInEarlySpring = (hives: HiveModel[]): boolean => {
    const { thresholdWeightDecreaseEarlySpring, earlySpringStartMonth, earlySpringEndMonth } = userViewModel;
    const currentMonth = new Date().getMonth();
    const startMonth = earlySpringStartMonth.getMonth();
    const endMonth = earlySpringEndMonth.getMonth();

    if (currentMonth >= startMonth && currentMonth <= endMonth) {
        for (let i = 1; i < hives.length; i++) {
            if (hives[i].weight !== undefined && hives[i - 1].weight !== undefined) {
                const weightDecrease = (hives[i - 1].weight ?? 0) - (hives[i].weight ?? 0);
                if (weightDecrease >= thresholdWeightDecreaseEarlySpring) {
                    return true;
                }
            }
        }
    }
    return false;
};


/**
 * Determines if the weight of any hive decreases significantly during the autumn months.
 * This function supports the beekeeping management process by signaling when bees might need additional feeding to prepare for winter.
 * @notification ConsiderFeeding - Triggers a 'ConsiderFeeding' notification if a significant decrease in hive weight is detected during the autumn, suggesting that bees may require additional feeding.
 * @param hives An array of HiveModel objects, each containing information about a single hive's conditions over time.
 * @returns A boolean value indicating whether the weight of any hive decreases significantly during the autumn period, as defined by the user's preferences in UserViewModel.
 */
export const doesHiveWeightDecreaseInAutumn = (hives: HiveModel[]): boolean => {
    const { thresholdWeightDecreaseInAutumn, autumnStartMonth, autumnEndMonth } = userViewModel;
    const currentMonth = new Date().getMonth();
    const startMonth = autumnStartMonth.getMonth();
    const endMonth = autumnEndMonth.getMonth();

    if (currentMonth >= startMonth && currentMonth <= endMonth) {
        for (let i = 1; i < hives.length; i++) {
            if (hives[i].weight !== undefined && hives[i - 1].weight !== undefined) {
                const weightDecrease = (hives[i - 1].weight ?? 0) - (hives[i].weight ?? 0);
                if (weightDecrease >= thresholdWeightDecreaseInAutumn) {
                    return true;
                }
            }
        }
    }
    return false;
};


/**
 * Checks if there is a snow forecast during the autumn months based on the user's location.
 * @notification Weather - Triggers a 'Weather' notification if snow is forecasted during the autumn, highlighting the need for physical preparations to protect the hives.
 * @notification ConsiderFeeding - Additionally triggers a 'ConsiderFeeding' notification if snow is forecasted, indicating the need to assess and possibly supplement the hive's food supply in expectation of restricted foraging opportunities.
 * @param weatherConditions An array of objects, each containing a `date` (as a Date object), a `forecast` string, and a `country` string matching the user's current country.
 * @returns A boolean value indicating whether snow is forecasted during the autumn period for the user's current country.
 */
export const isSnowForecastInAutumn = (weatherConditions: { date: Date; forecast: string, country: string }[]): boolean => {
    const { autumnStartMonth, autumnEndMonth } = userViewModel;
    const userCountry = userViewModel.currentCountry || 'NO';
    const currentMonth = new Date().getMonth();
    const startMonth = autumnStartMonth.getMonth();
    const endMonth = autumnEndMonth.getMonth();

    if (currentMonth >= startMonth && currentMonth <= endMonth) {
        return weatherConditions.some(condition =>
            condition.country === userCountry &&
            condition.forecast.toLowerCase().includes('snø') &&
            condition.date.getMonth() >= startMonth &&
            condition.date.getMonth() <= endMonth
        );
    }
    return false;
};


/**
 * Determines if the number of bee exits from the hive is consistently low over a given period. 
 * @notification PossibleSwarm - Triggers a 'PossibleSwarm' notification if low exit counts suggest the bees might be preparing to swarm.
 * @notification ConsiderFeeding - Triggers a 'ConsiderFeeding' notification if low exit counts could indicate a lack of foraging success, suggesting the need to assess and possibly supplement the hive's food supply.
 * @param hives An array of HiveModel objects, including the count of bee exits.
 * @returns A boolean value indicating whether the bee exits have consistently been below a specified threshold.
 */
export const haveFewBeesExited = (hives: HiveModel[]): boolean => {
    const thresholdExitCount = userViewModel.thresholdExitCountLow;

    return hives.every(hive => hive.beeCount !== undefined && hive.beeCount <= thresholdExitCount);
};


/**
 * Function for checking if a significant number of bees have been exiting the hive.
 * @notification PossibleSwarm - Alerts to the possibility of swarming activity.
 * @notification CheckHive
 * @param hives Array of HiveModel objects, including the count of bee exits.
 * @returns A boolean indicating whether a significant number of bees have been exiting the hive.
 */
export const haveLotsOfBeesExited = (hives: HiveModel[]): boolean => {
    const thresholdExitCountHigh = userViewModel.thresholdExitCountHigh;

    return hives.some(hive => hive.beeCount !== undefined && hive.beeCount >= thresholdExitCountHigh);
};


/**
 * Evaluates weather forecasts to determine if snow is expected based on user's location.
 * @notification Weather - This function can trigger a 'Weather' notification to alert users about the possibility of significant snowfall.
 * @notfication ConsiderFeeding
 * @param weatherConditions Array of objects, each representing a weather forecast description and the country it applies to.
 * @returns True if the forecast includes significant snow keywords, otherwise false.
 */
export const isSnowForecast = (weatherConditions: { forecast: string; country: string }[]): boolean => {
    const userCountry = userViewModel.currentCountry || 'NO';
    return weatherConditions.some(condition =>
        condition.forecast.toLowerCase().includes('snø') && condition.country === userCountry);
};


/**
 * Evaluates weather forecasts to determine if rain is expected based on user's location.
 * @notification Weather - This function can trigger a 'Weather' notification to alert users about the possibility of significant rainfall.
 * @param weatherConditions Array of objects, each representing a weather forecast description and the country it applies to.
 * @returns True if the forecast includes the keyword 'rain' for the user's current country, otherwise false.
 */
export const isRainForecast = (weatherConditions: { forecast: string; country: string }[]): boolean => {
    const userCountry = userViewModel.currentCountry || 'NO';
    return weatherConditions.some(condition =>
        condition.forecast.toLowerCase().includes('regn') && condition.country === userCountry);
};


/**
 * Function for checking if strong winds are forecast based on user-defined threshold, considering the user's location.
 * @notification Weather - Triggers a 'Weather' notification when forecasted wind speeds meet or exceed the user-defined threshold for strong winds in the user's current country.
 * @notification ConsiderFeeding
 * @param weatherConditions Array of objects, each representing a wind speed forecast and the country it applies to.
 * @returns A boolean indicating whether strong winds are forecast in the user's current country.
 */
export const areStrongWindsForecast = (weatherConditions: { windSpeed: number; country: string }[]): boolean => {
    const userCountry = userViewModel.currentCountry || 'NO';
    const thresholdWindSpeed = userViewModel.thresholdWindSpeedStrong;

    return weatherConditions.some(condition =>
        condition.country === userCountry && condition.windSpeed >= thresholdWindSpeed);
};


/**
 * Function for checking if a drought is forecast based on user's location.
 * @notification Weather - Triggers a 'Weather' notification when 'drought' is detected in the forecast for the user's current country.
 * @notification ConsiderFeeding - In addition, triggers a 'ConsiderFeeding' notification for beekeepers, indicating that supplementary feeding may be necessary due to reduced availability of natural food sources for bees during drought conditions.
 * @notfication Maintenance
 * @param weatherConditions Array of objects, each representing a weather forecast description and the country it applies to.
 * @returns A boolean indicating whether a drought is forecast in the user's current country.
 */
export const isDroughtForecast = (weatherConditions: { forecast: string; country: string }[]): boolean => {
    const userCountry = userViewModel.currentCountry || 'NO';
    return weatherConditions.some(condition =>
        condition.forecast.includes('tørke') && condition.country === userCountry);
};


/**
 * Determines if 'snow' is forecasted during specific seasons (autumn, early winter, and early spring) based on the current month and the user's location.
 * This function checks if the array of weather conditions contains 'snow' for the user's current country, 
 * and then verifies if the current month falls within the predefined months for autumn, 
 * early winter, or early spring as specified in the userViewModel.
 * @notification Weather - Triggers a 'Weather' notification when snow is forecasted during the specified seasons of autumn, early winter, or early spring for the user's current country.
 * @notification ConsiderFeeding
 * @notification CheckHive
 * @param weatherConditions An array of objects, each representing a forecast description and the country it applies to.
 * @returns True if the current date falls within the specified seasons (autumn, early winter, 
 * or early spring), 'snow' is included in the weather conditions, and the conditions apply to the user's current country. False otherwise.
 */
export const isSnowForecastInSpecificSeasons = (weatherConditions: { forecast: string; country: string }[]): boolean => {
    const userCountry = userViewModel.currentCountry || 'NO';
    const currentMonth = new Date().getMonth();

    const snowForecastInUserCountry = weatherConditions.some(condition =>
        condition.forecast.toLowerCase().includes('snø') && condition.country === userCountry
    );

    if (!snowForecastInUserCountry) {
        return false;
    }

    const isWithinSeason = (seasonDates: Date[]) => seasonDates.some(seasonDate =>
        currentMonth === seasonDate.getMonth()
    );

    return isWithinSeason(userViewModel.autumnMonths) ||
        isWithinSeason(userViewModel.earlyWinterMonths) ||
        isWithinSeason(userViewModel.earlySpringMonths);
};


/**
 * Function to check for warm days with low wind speed between early spring and late autumn,
 * taking into account the user's current country.
 *   
 * @notification Weather - Indicates a notable weather pattern that might impact bee activity and hive conditions.
 * @notification Maintenance - Suggests that the weather conditions are ideal for performing hive maintenance.
 * @notification HoneyHarvest
 * @param weatherConditions Array of objects representing daily weather conditions, including the country.
 * @returns A boolean indicating whether the conditions meet the criteria for the user's current country.
 */
export const isIdealBeeWeatherBetweenEarlySpringAndLateAutumn = (
    weatherConditions: { temperature: number; windSpeed: number; country: string }[]): boolean => {
    const userCountry = userViewModel.currentCountry || 'NO';
    const currentMonth = new Date().getMonth();
    const earlySpringStartMonth = userViewModel.earlySpringStartMonth.getMonth();
    const autumnEndMonth = userViewModel.autumnEndMonth.getMonth();
    const thresholdWindSpeedLow = userViewModel.thresholdWindSpeedLow;
    const thresholdTempOptimal = userViewModel.thresholdTemperatureOptimal;

    const filteredConditions = weatherConditions.filter(condition =>
        condition.country === userCountry &&
        currentMonth >= earlySpringStartMonth &&
        currentMonth <= autumnEndMonth
    );

    return filteredConditions.some(condition =>
        condition.temperature >= thresholdTempOptimal &&
        condition.windSpeed <= thresholdWindSpeedLow
    );
};


/**
 * Function to check for warm days with low wind speed between summer and early autumn
 * taking into account the user's current country.
 * @notification Maintenance - Suggests optimal conditions for performing hive maintenance.
 * @notification HoneyHarvest - Indicates ideal conditions for honey harvesting due to the stable and favorable weather, potentially leading to a successful and efficient harvest.
 * @param weatherConditions Array of objects representing daily weather conditions.
 * @returns A boolean indicating whether the conditions meet the criteria for a warm, dry day with low wind speed in the specified period.
 */
export const isIdealBeeWeatherBetweenSummerAndEarlyAutumn = (
    weatherConditions: { temperature: number; humidity: number; windSpeed: number, country: string }[],
): boolean => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const userCountry = userViewModel.currentCountry || 'NO';

    const thresholdTempOptimal = userViewModel.thresholdTemperatureOptimal;
    const thresholdWindSpeedLow = userViewModel.thresholdWindSpeedLow;
    const summerStartMonth = userViewModel.summerStartMonth.getMonth();
    const earlyAutumnMonth = userViewModel.earlyAutumnMonth.getMonth();

    const relevantConditions = weatherConditions.filter(condition =>
        condition.country === userCountry &&
        currentMonth >= summerStartMonth &&
        currentMonth <= earlyAutumnMonth
    );

    return relevantConditions.some(condition =>
        condition.temperature >= thresholdTempOptimal &&
        condition.windSpeed <= thresholdWindSpeedLow
    );
};


/**
 * Checks if there has been a significant increase in hive weight between any two consecutive observations within a specified period,
 * indicating potential hive growth. This function examines each pair of consecutive weight measurements to identify any single instance of
 * weight increase that meets or exceeds the thresholdWeightIncrease. It's particularly useful for detecting sudden changes that might
 * suggest rapid colony growth or significant honey accumulation.
 * 
 * The evaluation period is defined by productionPeriodDays, but unlike shouldConsiderHiveExpansionBasedOnWeightIncrease, which assesses
 * total weight change over the period, this function focuses on significant increases between any two measurements, offering a more granular
 * insight into hive weight dynamics.
 * 
 * @notification ConsiderExpanding - Triggers if a significant weight increase between any two measurements is observed, indicating the hive may be becoming crowded and might benefit from expansion.
 * @notification HoneyHarvest
 * @param hives Array of HiveModel objects, representing the hive's conditions over a series of observations.
 * @returns A boolean indicating whether there has been a significant weight increase between any two consecutive measurements, suggesting the need for potential hive expansion.
 */
export const doesHiveWeightIncreaseSignificantly = (hives: HiveModel[]): boolean => {
    if (hives.length < userViewModel.productionPeriodDays) {
        console.error("Insufficient data: The number of hive observations does not cover the production period.");
        return false;
    }
    for (let i = 1; i < hives.length; i++) {
        if (hives[i].weight !== undefined && hives[i - 1].weight !== undefined) {
            const weightIncrease = (hives[i].weight ?? 0) - (hives[i - 1].weight ?? 0);
            if (weightIncrease >= userViewModel.thresholdWeightIncrease) {
                return true;
            }
        }
    }
    return false;
};


/**
 * Evaluates the total increase in hive weight over a specified period, as represented by weights in a series of HiveModel objects,
 * to determine the need for hive expansion. This function aggregates the daily weight increases to assess the overall hive growth over time,
 * rather than focusing on individual fluctuations. It's particularly suited for identifying gradual increases in hive weight that could indicate
 * the hive is becoming crowded, potentially necessitating expansion.
 * 
 * The evaluation period is defined by productionPeriodDays, with significant weight gain determined by comparing the total weight change to the
 * productionPeriodThreshold. A total weight increase meeting or exceeding this threshold suggests the hive may require more space to accommodate
 * its growth.
 * 
 * @notification ConsiderExpanding - Indicates that the hive may be becoming too crowded due to a significant increase in weight, suggesting the need to consider expanding the hive.
 * @notification HoneyHarvest
 * @param hives Array of HiveModel objects, representing the hive's conditions over the specified production period.
 * @returns A boolean indicating whether the hive weight gain over the period suggests the need to consider expansion.
 */
export const shouldConsiderHiveExpansionBasedOnWeightIncrease = (hives: HiveModel[]): boolean => {
    if (hives.length < userViewModel.productionPeriodDays) {
        return false;
    }

    let totalWeightChange = 0;

    for (let i = 1; i < hives.length; i++) {
        const currentWeight = hives[i].weight ?? 0;
        const previousWeight = hives[i - 1].weight ?? 0;
        let dailyChange = currentWeight - previousWeight;
        totalWeightChange += dailyChange;
    }
    return totalWeightChange >= userViewModel.productionPeriodThreshold;
};


/**
 * Evaluates if there has been a significant decrease in hive weight between any two consecutive observations
 * within a specified period, potentially indicating issues such as swarming behavior.
 * This function checks each pair of consecutive weight measurements to identify any single instance of weight decrease
 * that meets or exceeds the thresholdWeightDecrease. It's particularly useful for detecting sudden changes that might
 * require immediate attention, like the potential for a hive to swarm.
 * 
 * @notification PossibleSwarm - Triggers a 'PossibleSwarm' notification if a significant decrease in weight is observed, 
 * signaling the beekeeper to inspect the hive for signs of swarming.
 * @param hives Array of HiveModel objects, representing the hive's conditions over a series of observations.
 * @returns A boolean indicating whether there's been a significant decrease in hive weight between any two consecutive observations.
 */
export const doesHiveWeightDecreaseSignificantly = (hives: HiveModel[]): boolean => {
    if (hives.length < userViewModel.productionPeriodDays) {
        return false;
    }

    for (let i = 1; i < hives.length; i++) {
        if (hives[i].weight !== undefined && hives[i - 1].weight !== undefined) {
            const weightDecrease = (hives[i - 1].weight ?? 0) - (hives[i].weight ?? 0);
            if (weightDecrease >= userViewModel.thresholdWeightDecrease) {
                return true;
            }
        }
    }
    return false;
};


/**
 * Evaluates the total decrease in hive weight over a specified period, as indicated by the weights in a series of HiveModel objects,
 * to determine if there is a need for action. This approach aggregates the daily weight changes to assess the overall
 * health and condition of the hive over time, rather than focusing on individual fluctuations.
 * 
 * @notification ConsiderFeeding - Indicates that the hive may be depleting its stored resources due to a significant decrease in weight,
 * suggesting that the bees might require feeding to replenish their supplies.
 * @notification PossibleSwarm - Additionally triggers a 'PossibleSwarm' notification if the significant decrease in weight suggests the bees might be preparing to swarm,
 * signaling the beekeeper to inspect the hive for further signs and to consider interventions.
 * @param hives Array of HiveModel objects, representing the hive's conditions over the specified production period.
 * @returns A boolean indicating whether the total weight loss over the period.
 */

export const shouldConsiderFeedingBasedOnWeightDecrease = (hives: HiveModel[]): boolean => {
    if (hives.length < userViewModel.productionPeriodDays) {
        return false;
    }

    let totalWeightChange = 0;

    for (let i = 1; i < hives.length; i++) {
        const currentWeight = hives[i].weight ?? 0;
        const previousWeight = hives[i - 1].weight ?? 0;
        let dailyChange = previousWeight - currentWeight;
        totalWeightChange += dailyChange;
    }

    if (totalWeightChange >= userViewModel.productionPeriodThreshold) {
        return true;
    }
    return false;
};



/**
 * Checks if the outdoor temperature exceeds the user-defined maximum threshold based on the user's location.
 * @notification CheckHive - Triggers a 'CheckHive' notification if the outdoor temperature goes above the maximum threshold,
 * indicating potential stress on the hive due to heat, specific to the user's location.
 * @param weatherConditions Array of objects, each containing daily outdoor temperature and the country it applies to.
 * @returns A boolean indicating whether the outdoor temperature has exceeded the user-defined maximum threshold at any point, in the user's location.
 */
export const isOutdoorTemperatureAboveMax = (weatherConditions: { temperature: number; country: string }[]): boolean => {
    const userCountry = userViewModel.currentCountry || 'NO';
    const thresholdMax = userViewModel.thresholdTemperatureMax;

    return weatherConditions.some(condition =>
        condition.country === userCountry && condition.temperature > thresholdMax);
};


/**
 * Checks if the outdoor temperature falls below the user-defined minimum threshold based on the user's location.
 * @notification CheckHive - Triggers a 'CheckHive' notification if the outdoor temperature goes below the minimum threshold,
 * indicating potential stress on the hive due to cold, specific to the user's location.
 * @param weatherConditions Array of objects, each containing daily outdoor temperature and the country it applies to.
 * @returns A boolean indicating whether the outdoor temperature has fallen below the user-defined minimum threshold at any point, in the user's location.
 */
export const isOutdoorTemperatureBelowMin = (weatherConditions: { temperature: number; country: string }[]): boolean => {
    const userCountry = userViewModel.currentCountry || 'NO';
    const thresholdMin = userViewModel.thresholdTemperatureMin;

    return weatherConditions.some(condition =>
        condition.country === userCountry && condition.temperature < thresholdMin);
};


/**
 * Function for checking if the humidity in any of the provided hives is below a user-specified minimum humidity level.
 * @notification CheckHive - Triggers a 'CheckHive' notification if a humidity value is found to be below the minimum threshold,
 * advising beekeepers to inspect the hive for potential issues like dryness that could harm the bees or disrupt their activities.
 * @param hives An array of HiveModel objects, each containing information about a single hive's conditions.
 * @returns True if any hive's humidity is below the minimum humidity parameter defined in the userViewModel, otherwise false.
 */
export const isHumidityBelowMinimum = (hives: HiveModel[]): boolean => {
    for (const hive of hives) {
        if (hive.humidity !== undefined && hive.humidity < userViewModel.thresholdHumidityMin) {
            return true;
        }
    }
    return false;
};



/**
 * Function for checking if the humidity in any of the provided hives is above a user-specified maximum humidity level.
 * @notification CheckHive - Triggers a 'CheckHive' notification if a humidity value is found to be above the maximum threshold,
 * advising beekeepers to inspect the hive for potential high humidity problems that could negatively impact the colony's health.
 * @param hives An array of HiveModel objects, each containing information about a single hive's conditions.
 * @returns True if any hive's humidity is above the maximum humidity parameter defined in the userViewModel, otherwise false.
 */
export const isHumidityAboveMaximum = (hives: HiveModel[]): boolean => {
    for (const hive of hives) {
        if (hive.humidity !== undefined && hive.humidity > userViewModel.thresholdHumidityMax) {
            return true;
        }
    }
    return false;
};


/**
 * Function for checking the risk of swarming based on user-defined periods for late spring and early summer.
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
 * Checks if winter is starting based on predefined winter start month, current temperature, and user's location.
 * @notification ConsiderFeeding - Winter can be a challenging time for bees, as natural food sources become scarce.
 * @notification Weather - Indicates a seasonal change in weather conditions that will impact bee activity and hive conditions.
 * @param weatherConditions Array of objects representing daily weather conditions including temperature and country.
 * @returns A boolean indicating whether winter is arriving, considering both the month, temperature criteria, and user's location.
 */
export const isWinterStarting = (weatherConditions: { temperature: number; country: string }[]): boolean => {
    const userCountry = userViewModel.currentCountry || 'NO';
    const winterStartMonth = userViewModel.winterStart.getMonth();
    const currentMonth = new Date().getMonth();

    return weatherConditions.some(condition =>
        condition.country === userCountry &&
        currentMonth === winterStartMonth &&
        condition.temperature < userViewModel.thresholdTemperatureMin
    );
};


/**
 * Checks if winter is about to end based on predefined winter end month, current temperature, and user's location.
 * 
 * @notification CheckHive - Check the condition of the hive, including the health of the bee colony, after months of less activity.
 * @notification Weather - Indicates a seasonal change in weather conditions that will impact bee activity and hive conditions.
 * @param weatherConditions Array of objects representing daily weather conditions including temperature and country.
 * @returns A boolean indicating whether winter is soon to be over, considering both the month, temperature criteria, and user's location.
 */
export const isWinterEnding = (weatherConditions: { temperature: number; country: string }[]): boolean => {
    const userCountry = userViewModel.currentCountry || 'NO';
    const winterEndMonth = userViewModel.winterEnd.getMonth();
    const currentMonth = new Date().getMonth();

    return weatherConditions.some(condition =>
        condition.country === userCountry &&
        currentMonth === winterEndMonth &&
        condition.temperature > userViewModel.thresholdTemperatureMin
    );
};


/**
 * Checks if the early winter period is starting based on user-defined dates.
 * @notification ConsiderFeeding - Winter can be a challenging time for bees, as natural food sources become scarce.
 * @returns A boolean indicating whether the current date is the start of the early winter period.
 */
export const isEarlyWinterStarting = (): boolean => {
    const currentMonth = new Date().getMonth();
    const currentDate = new Date().getDate();
    const earlyWinterStartMonth = userViewModel.earlyWinterStart.getMonth();
    const earlyWinterStartDate = userViewModel.earlyWinterStart.getDate();

    return currentMonth === earlyWinterStartMonth && currentDate === earlyWinterStartDate;
};


/**
 * Checks if the early winter period is ending based on user-defined dates.
 * @notification CheckHive - Check the condition of the hive, including the health of the bee colony, after months of less activity.
 * @returns A boolean indicating whether the current date is the end of the early winter period.
 */
export const isEarlyWinterEnding = (): boolean => {
    const currentMonth = new Date().getMonth();
    const currentDate = new Date().getDate();
    const earlyWinterEndMonth = userViewModel.earlyWinterEnd.getMonth();
    const earlyWinterEndDate = userViewModel.earlyWinterEnd.getDate();

    return currentMonth === earlyWinterEndMonth && currentDate === earlyWinterEndDate;
};


/**
 * Checks if the early winter period is starting based on user-defined dates.
 * @notification ConsiderExpanding - a time of strong growth inside the hive, with increased nectar flow and hive activity
 * @notification Maintenance - Summer can bring challenges that require the beehives to be maintained to ensure good ventilation and temperature regulation.
 * @returns A boolean indicating whether the current date is the start of the early winter period.
 */
export const isEarlySummerStarting = (): boolean => {
    const currentMonth = new Date().getMonth();
    const earlyWinterStartMonth = userViewModel.earlySummerStartMonth.getMonth();

    return currentMonth === earlyWinterStartMonth;
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

