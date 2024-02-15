import { deserialiseDailyForecast } from "./weatherForecastDeserialiser";

//TODO Test
/**
 * A function used to calculate the total daily rainfall in a 24 hour period.
 * @param json The JSON obtained from Yr's LocationForecast API response.
 * @param dateIso Parameter representing only the date string in ISO 8601 format. Recommended 
 * to use the {@link getForecastDateFormat} function.
 * @returns Returns the total amount of rainfall for a specific date in a 24 hour period.
 * @example 
 * // Retrieves tomorrow's rainfall.
 * const rainfall = calculateDailyRainfall(jsonResponse, getForecastDateFormat(1));
 * // Prints '16.2'.
 * console.log(rainfall);
 */
export const calculateDailyRainfall = (json: any, dateIso: string): number => {
    // TODO Add validation that restricts dateIso values if they are previous dates. Not too important.
    const rainfall: number[] = [];
    let totalRainfall = 0;

    const forecast = deserialiseDailyForecast(json, dateIso);

    // Each timeseries includes precipitation levels for the next 6 hours.
    const firstTimeseries = forecast.hourlyForecasts['00HundredHours']
    const secondTimeseries = forecast.hourlyForecasts['06HundredHours']
    const thirdTimeseries = forecast.hourlyForecasts['12HundredHours']
    const fourthTimeseries = forecast.hourlyForecasts['18HundredHours']
    
    // Yr's LocationForecast sometimes returns no timeseries in the case that today's date is 
    // selected and the time has already passed.
    firstTimeseries ? rainfall.push(firstTimeseries.precipitation) : null
    secondTimeseries ? rainfall.push(secondTimeseries.precipitation) : null
    thirdTimeseries ? rainfall.push(thirdTimeseries.precipitation) : null
    fourthTimeseries ? rainfall.push(fourthTimeseries.precipitation) : null

    rainfall.forEach((number) => {
        totalRainfall += number;
    });
    
    return totalRainfall
}