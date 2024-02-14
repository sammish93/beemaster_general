import { PrecipitationMeasurement, TemperatureMeasurement, WindSpeedMeasurement } from "@/constants/Measurements";
import { CurrentForecast, DailyForecast, WeeklyDetailedForecast, WeeklySimpleForecast } from "@/models/forecast";
import { celsiusToFahrenheit, metersPerSecondToKilometersPerHour, metersPerSecondToKnots, metersPerSecondToMilesPerHour, millimetersToCentimeters, millimetersToInches } from './measurementConverter';

//TODO Test
/**
 * Used to retrieve the current forecast.
 * @param json The JSON obtained from Yr's LocationForecast API response.
 * @param temperatureFormat Optional paramater which uses the {@link TemperatureMeasurement} enum.
 * @param precipitationFormat Optional paramater which uses the {@link PrecipitationMeasurement} enum.
 * @param WindSpeedMeasurement Optional paramater which uses the {@link WindSpeedMeasurement} enum.
 * @returns Returns the weather forecast based on the format of the {@link CurrentForecast} interface.
 */
export const deserialiseCurrentForecast = (
    json: any,
    temperatureFormat?: TemperatureMeasurement, 
    precipitationFormat?: PrecipitationMeasurement, 
    windSpeedFormat?: WindSpeedMeasurement
    ): CurrentForecast => {

    // Yr's LocationForecast API delivers coordinates in the format [longitude, latitude].
    // I decided to reverse the order of this because Google's geo-based API's all use the lat then lng 
    // order instead.
    const latLng: [number, number] = [
        json.geometry.coordinates[1],
        json.geometry.coordinates[0]
    ];
  
    // The current forecast.
    const firstTimeseries = json.properties.timeseries[0];
   
    const currentForecast =  extractForecastData(
        firstTimeseries, temperatureFormat, precipitationFormat, windSpeedFormat)

    return { 
        latLng, 
        currentForecast, 
    };
}

//TODO Test
/**
 * Used to retrieve the daily forecast. If the date is within the next 48 hours then the forecast is 
 * broken down into hourly increments, otherwise it is broken down into increments of 6 hours.
 * @param json The JSON obtained from Yr's LocationForecast API response.
 * @param dateIso An optional parameter to specify which date to retrieve the forecast from.
 * @param temperatureFormat Optional paramater which uses the {@link TemperatureMeasurement} enum.
 * @param precipitationFormat Optional paramater which uses the {@link PrecipitationMeasurement} enum.
 * @param WindSpeedMeasurement Optional paramater which uses the {@link WindSpeedMeasurement} enum.
 * @returns Returns the weather forecast based on the format of the {@link DailyForecast} interface.
 * @example
 * // Returns the forecast for tomorrow (today's date + 1 day).
 * const forecast = deserialiseDailyForecast(jsonResponse, getForecastDateFormat(1))
 */
export const deserialiseDailyForecast = (
    json: any, 
    dateIso?: string,
    temperatureFormat?: TemperatureMeasurement, 
    precipitationFormat?: PrecipitationMeasurement, 
    windSpeedFormat?: WindSpeedMeasurement
    ): DailyForecast => {
    
    // Yr's LocationForecast API delivers coordinates in the format [longitude, latitude].
    // I decided to reverse the order of this because Google's geo-based API's all use the lat then lng 
    // order instead.
    const latLng: [number, number] = [
      json.geometry.coordinates[1],
      json.geometry.coordinates[0]
    ];
  
    // Initialisation of an object to store the forecast of each hour
    const hourlyForecasts: { [key: string]: any } = {};
    // Function used in the for-loop to return a forecast object for a specific time period.
    // Note that it returns null if the forecast data could not be found.
    const processHourlyData = (hour: string) => {
      const hourlyForecastTime = getHourlyForecastDateFormat(hour, dateIso);
      const timeseriesEntry = json.properties.timeseries.find(
        (entry: any) => entry.time === hourlyForecastTime);
      const thing = timeseriesEntry ? extractForecastData(
        timeseriesEntry, temperatureFormat, precipitationFormat, windSpeedFormat) : null;
      return thing
    };
  
    // Iterates 24 times - one for each hour of the day.
    for (let hour = 0; hour <= 23; hour++) {
      const hourKey = `${hour.toString().padStart(2, '0')}HundredHours`;
      hourlyForecasts[hourKey] = processHourlyData(hour.toString().padStart(2, '0'));
    }
  
    return {
      latLng,
      hourlyForecasts
    };
  }

//TODO Test
/**
 * Used to retrieve the current forecast, along with the following 6 days forecasts (7 days total).
 * @param json The JSON obtained from Yr's LocationForecast API response.
 * @param temperatureFormat Optional paramater which uses the {@link TemperatureMeasurement} enum.
 * @param precipitationFormat Optional paramater which uses the {@link PrecipitationMeasurement} enum.
 * @param WindSpeedMeasurement Optional paramater which uses the {@link WindSpeedMeasurement} enum.
 * @returns Returns the weather forecast based on the format of the {@link WeeklySimpleForecast} interface.
 */
export const deserialiseWeeklySimpleForecast = (
    json: any,
    temperatureFormat?: TemperatureMeasurement, 
    precipitationFormat?: PrecipitationMeasurement, 
    windSpeedFormat?: WindSpeedMeasurement
    ): WeeklySimpleForecast => {

    // Yr's LocationForecast API delivers coordinates in the format [longitude, latitude].
    // I decided to reverse the order of this because Google's geo-based API's all use the lat then lng 
    // order instead.
    const latLng: [number, number] = [
        json.geometry.coordinates[1],
        json.geometry.coordinates[0]
    ];
  
    // Retrieves the data in the ISO 8601 format. The date is today's date + n number of days, and 
    // the time is set to midday (12:00).
    const dayTwo: string = getForecastDateTimeFormat(1);
    const dayThree: string = getForecastDateTimeFormat(2);
    const dayFour: string = getForecastDateTimeFormat(3);
    const dayFive: string = getForecastDateTimeFormat(4);
    const daySix: string = getForecastDateTimeFormat(5);
    const daySeven: string = getForecastDateTimeFormat(6);

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
    const currentForecast =  extractForecastData(
        firstTimeseries, temperatureFormat, precipitationFormat, windSpeedFormat)
    const dayTwoForecast = extractForecastData(
        secondTimeseries, temperatureFormat, precipitationFormat, windSpeedFormat)
    const dayThreeForecast = extractForecastData(
        thirdTimeseries, temperatureFormat, precipitationFormat, windSpeedFormat)
    const dayFourForecast = extractForecastData(
        fourthTimeseries, temperatureFormat, precipitationFormat, windSpeedFormat)
    const dayFiveForecast = extractForecastData(
        fifthTimeseries, temperatureFormat, precipitationFormat, windSpeedFormat)
    const daySixForecast = extractForecastData(
        sixthTimeseries, temperatureFormat, precipitationFormat, windSpeedFormat)
    const daySevenForecast = extractForecastData(
        seventhTimeseries, temperatureFormat, precipitationFormat, windSpeedFormat)

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
 * Used to retrieve the current forecast, along with the following 6 days forecasts (7 days total). 
 * The forecast is broken down into hourly (or 6 hourly) increments.
 * @param json The JSON obtained from Yr's LocationForecast API response.
 * @param temperatureFormat Optional paramater which uses the {@link TemperatureMeasurement} enum.
 * @param precipitationFormat Optional paramater which uses the {@link PrecipitationMeasurement} enum.
 * @param WindSpeedMeasurement Optional paramater which uses the {@link WindSpeedMeasurement} enum.
 * @returns Returns the weather forecast based on the format of the {@link WeeklyDetailedForecast} interface.
 */
export const deserialiseWeeklyDetailedForecast = (
    json: any, 
    temperatureFormat?: TemperatureMeasurement, 
    precipitationFormat?: PrecipitationMeasurement, 
    windSpeedFormat?: WindSpeedMeasurement
    ): WeeklyDetailedForecast => {

    // Yr's LocationForecast API delivers coordinates in the format [longitude, latitude].
    // I decided to reverse the order of this because Google's geo-based API's all use the lat then lng 
    // order instead.
    const latLng: [number, number] = [
        json.geometry.coordinates[1],
        json.geometry.coordinates[0]
    ];
  
    const dayOneForecast = deserialiseDailyForecast(
        json, getForecastDateFormat(0), temperatureFormat, precipitationFormat, windSpeedFormat);
    const dayTwoForecast = deserialiseDailyForecast(
        json, getForecastDateFormat(1), temperatureFormat, precipitationFormat, windSpeedFormat);
    const dayThreeForecast = deserialiseDailyForecast(
        json, getForecastDateFormat(2), temperatureFormat, precipitationFormat, windSpeedFormat);
    const dayFourForecast = deserialiseDailyForecast(
        json, getForecastDateFormat(3), temperatureFormat, precipitationFormat, windSpeedFormat);
    const dayFiveForecast = deserialiseDailyForecast(
        json, getForecastDateFormat(4), temperatureFormat, precipitationFormat, windSpeedFormat);
    const daySixForecast = deserialiseDailyForecast(
        json, getForecastDateFormat(5), temperatureFormat, precipitationFormat, windSpeedFormat);
    const daySevenForecast = deserialiseDailyForecast(
        json, getForecastDateFormat(6), temperatureFormat, precipitationFormat, windSpeedFormat);

    return { 
        latLng, 
        dayOneForecast, 
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
 * Used to retrieve a string in ISO 8601 format representing both a date and time.
 * @param daysToAdd An integer for the amount of days in advance (from today's date).
 * @returns Returns a string representing the date and time in ISO 8601 format. 
 * @example 
 * const dateString = getForecastDateTimeFormat(1);
 * // Prints '2024-02-19T12:00:00Z'.
 * console.log(dateString);
 */
export const getForecastDateTimeFormat = (daysToAdd: number): string => {
    const date = new Date();
    date.setDate(date.getDate() + daysToAdd);
    return `${date.toISOString().split('T')[0]}T12:00:00Z`;
}

//TODO Test
/**
 * Used to retrieve a the first part of a date time string in ISO 8601 format representing the date.
 * @param daysToAdd An integer for the amount of days in advance (from today's date).
 * @returns Returns a string representing only the date in ISO 8601 format. 
 * @example 
 * const dateString = getForecastDateFormat(1);
 * // Prints '2024-02-19'.
 * console.log(dateString);
 */
export const getForecastDateFormat = (daysToAdd: number): string => {
    const date = new Date();
    date.setDate(date.getDate() + daysToAdd);
    return date.toISOString().split('T')[0];
}

//TODO Test
/**
 * Used to retrieve a string in ISO 8601 format representing both a date and time.
 * @param hours A string representing the hours of a 24-hour clock. "04" corresponds to 4 A.M. while 
 * "21" corresponds to 9 P.M.
 * @param dateIso Optional parameter representing only the date string in ISO 8601 format. Recommended 
 * to use the {@link getForecastDateFormat} function.
 * @returns Returns a string representing the date and time in ISO 8601 format. 
 * @example 
 * const dateString = getHourlyForecastDateFormat("15", getForecastDateFormat(1));
 * // Prints '2024-02-19T15:00:00Z'.
 * console.log(dateString);
 */
export const getHourlyForecastDateFormat = (hours: string, dateIso?: string): string => {
    if (dateIso) {
        return `${dateIso}T${hours}:00:00Z`
    }

    const date = new Date();
    date.setDate(date.getDate());

    return `${date.toISOString().split('T')[0]}T${hours}:00:00Z`;
}

//TODO Test
/**
 * A function which simplifies deserialisation from Yr's LocationForecast API.
 * @param timeseriesEntry The time series the format found in Yr's LocationForecast API.
 * @param temperatureFormat Optional paramater which uses the {@link TemperatureMeasurement} enum.
 * @param precipitationFormat Optional paramater which uses the {@link PrecipitationMeasurement} enum.
 * @param WindSpeedMeasurement Optional paramater which uses the {@link WindSpeedMeasurement} enum.
 * @returns Returns an object containing all relevant information required about a specific weather 
 * forecast at a specific time.
 * @remarks If no optional formats are specified then the default values will be used. These are 
 * celsius, millimeters, and meters per second.
 */
export const extractForecastData = (
    timeseriesEntry: any, 
    temperatureFormat?: TemperatureMeasurement, 
    precipitationFormat?: PrecipitationMeasurement, 
    windSpeedFormat?: WindSpeedMeasurement
    ) => {
        let temperatureValue = timeseriesEntry.data.instant.details.air_temperature;
        let windSpeedValue = timeseriesEntry.data.instant.details.wind_speed;
        let precipitationValue = timeseriesEntry.data.next_6_hours ? timeseriesEntry.data.next_6_hours.details.precipitation_amount : 0.0;

        if (temperatureFormat === TemperatureMeasurement.Fahrenheit) {
            temperatureValue = celsiusToFahrenheit(temperatureValue);
        }

        if (windSpeedFormat === WindSpeedMeasurement.KilometersPerHour) {
            windSpeedValue = metersPerSecondToKilometersPerHour(windSpeedValue)
        } else if (windSpeedFormat === WindSpeedMeasurement.MilesPerHour) {
            windSpeedValue = metersPerSecondToMilesPerHour(windSpeedValue)
        } else if (windSpeedFormat === WindSpeedMeasurement.Knots) {
            windSpeedValue = metersPerSecondToKnots(windSpeedValue)
        }

        if (precipitationFormat === PrecipitationMeasurement.Centimeters) {
            precipitationValue = millimetersToCentimeters(precipitationValue)
        } else if (precipitationFormat === PrecipitationMeasurement.Inches) {
            precipitationValue = millimetersToInches(precipitationValue)
        }
    
        return {
            dateTime: timeseriesEntry.time,
            temperature: temperatureValue,
            humidity: timeseriesEntry.data.instant.details.relative_humidity,
            windSpeed: windSpeedValue,
            windFromDirection: timeseriesEntry.data.instant.details.wind_from_direction,
            precipitation: precipitationValue,
            weatherType: timeseriesEntry.data.next_12_hours ? timeseriesEntry.data.next_12_hours.summary.symbol_code : "default",
        };
}