import Forecast from "@/models/forecast";

//TODO Implement detailed weather forecast for specific day
//TODO Implement domain-level functions to make things easier for rest of group
//TODO Implement function that can calculate wind speed direction
//TODO Implement class that can convert values to imperial

//TODO Test
/**
 * Used to retrieve the current forecast, along with the following 6 days forecasts (7 days total).
 * @param json Requires Yr's LocationForecast API 
 * @returns Returns the weather forecast based on the format of the {@link Forecast} interface.
 */
export const deserialiseWeatherForecast = (json: any): Forecast => {

    // Yr's LocationForecast API delivers coordinates in the format [longitude, latitude].
    // I decided to reverse the order of this because Google's geo-based API's all use the lat then lng 
    // order instead.
    const latLng: [number, number] = [
        json.geometry.coordinates[1],
        json.geometry.coordinates[0]
    ];
  
    // Retrieves the data in the ISO 8601 format. The date is today's date + n number of days, and 
    // the time is set to midday (12:00).
    const dayTwo: string = getForecastDateFormat(1);
    const dayThree: string = getForecastDateFormat(2);
    const dayFour: string = getForecastDateFormat(3);
    const dayFive: string = getForecastDateFormat(4);
    const daySix: string = getForecastDateFormat(5);
    const daySeven: string = getForecastDateFormat(6);

    // Locates the specific timeframe from the JSON retrieved from Yr's LocationForecast API.
    // Current weather.
    const firstTimeseries = json.properties.timeseries[0];
    // Tomorrow's weather.
    const secondTimeseries = json.properties.timeseries.find((entry: any) => entry.time === dayTwo);
    const thirdTimeseries = json.properties.timeseries.find((entry: any) => entry.time === dayThree);
    const fourthTimeseries = json.properties.timeseries.find((entry: any) => entry.time === dayFour);
    const fifthTimeseries = json.properties.timeseries.find((entry: any) => entry.time === dayFive);
    const sixthTimeseries = json.properties.timeseries.find((entry: any) => entry.time === daySix);
    const seventhTimeseries = json.properties.timeseries.find((entry: any) => entry.time === daySeven);

    // Retrieves an object containing all relevant information. Yr's API contains much more information 
    // but we don't need all of it.
    const currentForecast =  extractForecastData(firstTimeseries)
    const dayTwoForecast = extractForecastData(secondTimeseries)
    const dayThreeForecast = extractForecastData(thirdTimeseries)
    const dayFourForecast = extractForecastData(fourthTimeseries)
    const dayFiveForecast = extractForecastData(fifthTimeseries)
    const daySixForecast = extractForecastData(sixthTimeseries)
    const daySevenForecast = extractForecastData(seventhTimeseries)

    return { 
        latLng, 
        currentForecast, 
        dayTwoForecast , 
        dayThreeForecast, 
        dayFourForecast, 
        dayFiveForecast, 
        daySixForecast, 
        daySevenForecast
    };
}

//TODO Test
/**
 * 
 * @param daysToAdd An integer for the amount of days in advance (from today's date).
 * @returns Returns a string representing the date and time in ISO 8601 format. 
 * @example 
 * const dateString = getForecastDateFormat(1);
 * // Prints '2024-02-19T12:00:00Z'.
 * console.log(dateString);
 */
export const getForecastDateFormat = (daysToAdd: number): string => {
    const date = new Date();
    date.setDate(date.getDate() + daysToAdd);
    return `${date.toISOString().split('T')[0]}T12:00:00Z`;
}

//TODO Test
/**
 * 
 * @param timeseriesEntry The time series in Yr's LocationForecast API.
 * @returns Returns an object containing all relevant information required about a specific weather 
 * forecast at a specific time.
 */
export const extractForecastData = (timeseriesEntry: any) => {
    return {
        temperature: timeseriesEntry.data.instant.details.air_temperature,
        humidity: timeseriesEntry.data.instant.details.relative_humidity,
        windSpeed: timeseriesEntry.data.instant.details.wind_speed,
        windFromDirection: timeseriesEntry.data.instant.details.wind_from_direction,
        precipitation: timeseriesEntry.data.next_6_hours.details ? timeseriesEntry.data.next_6_hours.details.precipitation_amount : 0.0,
        weatherType: timeseriesEntry.data.next_12_hours.summary.symbol_code,
    };
}