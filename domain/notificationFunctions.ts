
/**
 * Function for checking if temperatures are consistently warm for several days.
 * @param forecast Array of temperature forecasts.
 * @param numberOfDays Number of consecutive warm days to consider.
 * @param thresholdTemp Minimum temperature threshold to consider as "warm".
 * @returns A boolean indicating whether temperatures are consistently warm for the specified number of days.
 */
export const areTemperaturesConsistentlyWarm = (forecast: number[], numberOfDays: number, thresholdTemp: number): boolean => {
    let consecutiveWarmDays = 0;
    for (const temperature of forecast) {
        if (temperature >= thresholdTemp) {
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
 * Function for checking if snow is forecast.
 * @param forecast Array of weather forecasts.
 * @returns A boolean indicating whether snow is forecast.
 */
export const isSnowForecast = (forecast: string[]): boolean => {
    return forecast.includes('snow');
};

/**
 * Function for checking if strong winds are forecast.
 * @param forecast Array of wind speed forecasts.
 * @param thresholdWindSpeed Minimum wind speed threshold to consider as "strong".
 * @returns A boolean indicating whether strong winds are forecast.
 */
export const areStrongWindsForecast = (forecast: number[], thresholdWindSpeed: number): boolean => {
    return forecast.some(windSpeed => windSpeed >= thresholdWindSpeed);
};

/**
 * Function for checking if temperatures are getting warmer each day in spring.
 * @param temperatures Array of daily temperatures.
 * @returns A boolean indicating whether temperatures are getting warmer each day in spring.
 */
export const isWarmerEachDayInSpring = (temperatures: number[]): boolean => {
    for (let i = 1; i < temperatures.length; i++) {
        if (temperatures[i] <= temperatures[i - 1]) {
            return false;
        }
    }
    return true;
};

/**
 * Function for checking if hive temperature is too warm.
 * @param hives Array of hive objects.
 * @param userViewModel User view model containing temperature preferences.
 * @returns A boolean indicating whether the hive temperature is too warm.
 */
export const isHiveTooWarm = (hives: any[], userViewModel: any): boolean => {
    for (const hive of hives) {
        if (hive.currentTemp > userViewModel.maxTempParam) {
            return true;
        }
    }
    return false;
};