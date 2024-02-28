import { calculateDailyHighTemperature, calculateDailyLowTemperature, deserialiseCurrentForecast, deserialiseDailyForecast, deserialiseWeeklyDetailedForecast, deserialiseWeeklySimpleForecast, extractForecastData, getForecastDateFormat, getForecastDateTimeFormat, getHourlyForecastDateFormat } from '@/domain/weatherForecastDeserialiser'; // Adjust the import path accordingly
import { TemperatureMeasurement, PrecipitationMeasurement, WindSpeedMeasurement } from '@/constants/Measurements'; // Adjust the import path
import * as jsonResponse from '@/assets/testResources/weatherApiResponse.json';
import { DailyForecast } from '@/models/forecast';

describe('extractForecastData() Function Tests', () => {

    // Retrieves an object representing the current forecast from a json response stored locally.
    const currentForecast = jsonResponse.properties.timeseries[0]

    it('returns correct default values', () => {
        const result = extractForecastData(currentForecast);

        expect(result).toEqual({
            dateTime: "2024-02-14T10:00:00Z",
            temperature: -0.9,
            humidity: 85.5,
            windSpeed: 0.3,
            windFromDirection: 87.5,
            precipitation: 0.0,
            weatherType: "cloudy",
        });
    });

    it('returns correct values when default values are explicitly passed', () => {
        const result = extractForecastData(
            currentForecast, 
            TemperatureMeasurement.Celsius, 
            PrecipitationMeasurement.Millimeters, 
            WindSpeedMeasurement.MetersPerSecond
        );

        expect(result).toEqual({
            dateTime: "2024-02-14T10:00:00Z",
            temperature: -0.9,
            humidity: 85.5,
            windSpeed: 0.3,
            windFromDirection: 87.5,
            precipitation: 0.0,
            weatherType: "cloudy",
        });
    });
  
    it('converts temperature to Fahrenheit', () => {
        const result = extractForecastData(currentForecast, TemperatureMeasurement.Fahrenheit);

        expect(result.temperature).toBeCloseTo(30.38);
    });
  
    it('converts precipitation to inches', () => {
        const result = extractForecastData(currentForecast, undefined, PrecipitationMeasurement.Inches);

        expect(result.precipitation).toBeCloseTo(0.0);
    });
  
    it('converts wind speed to miles per hour', () => {
        const result = extractForecastData(currentForecast, undefined, undefined, WindSpeedMeasurement.MilesPerHour);
        
        expect(result.windSpeed).toBeCloseTo(0.3 * 2.23694);
    });
    
    it('handles missing next_6_hours gracefully', () => {
        const modifiedEntry = { ...currentForecast, data: { ...currentForecast.data, next_6_hours: null } };
        const result = extractForecastData(modifiedEntry);

        expect(result.precipitation).toBe(0.0);
    });
});
  
describe('getHourlyForecastDateFormat() Function Tests', () => {
    
    // System time must be mocked to ensure tests work as intended later on as well.
    beforeAll(() => {
        jest.useFakeTimers();
        jest.setSystemTime(new Date('2024-02-14T12:00:00Z'));
    });
  
    // Clears mocked system time as to not intefere with other tests.
    afterAll(() => {
        jest.useRealTimers();
    });
  
    it('formats date and time correctly with provided dateIso', () => {
        const hours = "15";
        const dateIso = "2024-02-19";

        const result = getHourlyForecastDateFormat(hours, dateIso);

        expect(result).toBe('2024-02-19T15:00:00Z');
    });
  
    it('formats date and time correctly without provided dateIso', () => {
        const hours = "04";
        const expectedDate = new Date().toISOString().split('T')[0];

        const result = getHourlyForecastDateFormat(hours);

        expect(result).toBe(`${expectedDate}T04:00:00Z`);
    });
});

describe('getForecastDateFormat() Function Tests', () => {

    const mockedDate = new Date('2024-02-15T12:00:00Z');
  
    // System time must be mocked to ensure tests work as intended later on as well.
    beforeAll(() => {
        jest.useFakeTimers();
        jest.setSystemTime(mockedDate);
    });
  
    // Clears mocked system time as to not intefere with other tests.
    afterAll(() => {
        jest.useRealTimers();
    });
  
    it('returns todays date when daysToAdd is 0', () => {
        const todayString = mockedDate.toISOString().split('T')[0];
        expect(getForecastDateFormat(0)).toEqual(todayString);
    });
  
    it('calculates future date correctly', () => {

        expect(getForecastDateFormat(1)).toEqual('2024-02-16');
        expect(getForecastDateFormat(10)).toEqual('2024-02-25');
    });
  
    it('calculates past date correctly', () => {
        expect(getForecastDateFormat(-1)).toEqual('2024-02-14');
        expect(getForecastDateFormat(-10)).toEqual('2024-02-05');
    });
  
    // 2024 is a leap year.
    it('handles leap year edge cases correctly', () => {
        jest.setSystemTime(new Date('2024-02-28'));
        expect(getForecastDateFormat(1)).toEqual('2024-02-29');
        expect(getForecastDateFormat(2)).toEqual('2024-03-01');
    });

    it('handles non-leap year edge cases correctly', () => {
        jest.setSystemTime(new Date('2023-02-28'));
        expect(getForecastDateFormat(1)).toEqual('2023-03-01');
    });
  
    it('handles end of month correctly', () => {
        jest.setSystemTime(new Date('2024-01-31'));
        expect(getForecastDateFormat(1)).toEqual('2024-02-01');
    });
});

describe('getForecastDateTimeFormat() Function Tests', () => {

    const mockedDate = new Date('2024-02-15T12:00:00Z');

    // System time must be mocked to ensure tests work as intended later on as well.
    beforeAll(() => {
        jest.useFakeTimers();
        jest.setSystemTime(mockedDate);
    });

    // Clears mocked system time as to not intefere with other tests.
    afterAll(() => {
        jest.useRealTimers();
    });

    it('returns todays date and time when daysToAdd is 0', () => {
        const todayDateTimeString = `${mockedDate.toISOString().split('T')[0]}T12:00:00Z`;
        expect(getForecastDateTimeFormat(0)).toEqual(todayDateTimeString);
    });

    it('calculates future date and time correctly', () => {
        expect(getForecastDateTimeFormat(1)).toEqual('2024-02-16T12:00:00Z');
        expect(getForecastDateTimeFormat(10)).toEqual('2024-02-25T12:00:00Z');
    });

    it('calculates past date and time correctly', () => {
        expect(getForecastDateTimeFormat(-1)).toEqual('2024-02-14T12:00:00Z');
        expect(getForecastDateTimeFormat(-10)).toEqual('2024-02-05T12:00:00Z');
    });

    // 2024 is a leap year.
    it('handles leap year edge cases correctly', () => {
        jest.setSystemTime(new Date('2024-02-28T12:00:00Z'));
        expect(getForecastDateTimeFormat(1)).toEqual('2024-02-29T12:00:00Z');
        expect(getForecastDateTimeFormat(2)).toEqual('2024-03-01T12:00:00Z');
    });

    it('handles non-leap year edge cases correctly', () => {
        jest.setSystemTime(new Date('2023-02-28T12:00:00Z'));
        expect(getForecastDateTimeFormat(1)).toEqual('2023-03-01T12:00:00Z');
    });

    it('handles end of month correctly', () => {
        jest.setSystemTime(new Date('2024-01-31T12:00:00Z'));
        expect(getForecastDateTimeFormat(1)).toEqual('2024-02-01T12:00:00Z');
    });
});

describe('deserialiseCurrentForecast() Function Tests', () => {

    it('correctly deserialises and formats forecast data', () => {
        const result = deserialiseCurrentForecast(
            jsonResponse,
            TemperatureMeasurement.Celsius,
            PrecipitationMeasurement.Millimeters,
            WindSpeedMeasurement.MetersPerSecond
        );

        expect(result.latLng).toEqual([59.9139, 10.7522]);
        expect(result.currentForecast).toEqual({
            dateTime: "2024-02-14T10:00:00Z",
            temperature: -0.9,
            humidity: 85.5,
            windSpeed: 0.3,
            windFromDirection: 87.5,
            precipitation: 0.0,
            weatherType: "cloudy"
        });
    });

        it('formats temperature in Fahrenheit', () => {
        const result = deserialiseCurrentForecast(
            jsonResponse,
            TemperatureMeasurement.Fahrenheit,
            PrecipitationMeasurement.Millimeters,
            WindSpeedMeasurement.MetersPerSecond
        );

        expect(result.currentForecast.temperature).toBeCloseTo(30.38);
    });

    it('formats precipitation in centimeters', () => {
        const result = deserialiseCurrentForecast(
            jsonResponse,
            TemperatureMeasurement.Celsius,
            PrecipitationMeasurement.Centimeters,
            WindSpeedMeasurement.MetersPerSecond
        );

        expect(result.currentForecast.precipitation).toBeCloseTo(0.0);
    });

    it('formats precipitation in inches', () => {
        const result = deserialiseCurrentForecast(
            jsonResponse,
            TemperatureMeasurement.Celsius,
            PrecipitationMeasurement.Inches,
            WindSpeedMeasurement.MetersPerSecond
        );

        expect(result.currentForecast.precipitation).toBeCloseTo(0.0);
    });

    it('formats wind speed in miles per hour', () => {
        const result = deserialiseCurrentForecast(
            jsonResponse,
            TemperatureMeasurement.Celsius,
            PrecipitationMeasurement.Millimeters,
            WindSpeedMeasurement.MilesPerHour
        );

        expect(result.currentForecast.windSpeed).toBeCloseTo(0.67);
    });

    it('formats wind speed in kilometers per hour', () => {
        const result = deserialiseCurrentForecast(
            jsonResponse,
            TemperatureMeasurement.Celsius,
            PrecipitationMeasurement.Millimeters,
            WindSpeedMeasurement.KilometersPerHour
        );

        expect(result.currentForecast.windSpeed).toBeCloseTo(1.08);
    });

    it('formats wind speed in knots', () => {
        const result = deserialiseCurrentForecast(
            jsonResponse,
            TemperatureMeasurement.Celsius,
            PrecipitationMeasurement.Millimeters,
            WindSpeedMeasurement.Knots
        );

        expect(result.currentForecast.windSpeed).toBeCloseTo(0.58);
    });
});

describe('deserialiseDailyForecast() Function Tests', () => {

    it('correctly deserialises and formats daily forecast data', () => {
        const dateIso = "2024-02-15";
        const result = deserialiseDailyForecast(
            jsonResponse,
            dateIso,
            TemperatureMeasurement.Celsius,
            PrecipitationMeasurement.Millimeters,
            WindSpeedMeasurement.MetersPerSecond
        );

        expect(result.latLng).toEqual([59.9139, 10.7522]);
        expect(Object.keys(result.hourlyForecasts)).toHaveLength(24);
        expect(result.hourlyForecasts['00HundredHours']).toEqual({
            dateTime: "2024-02-15T00:00:00Z",
            temperature: 1.8,
            humidity: 97.2,
            windSpeed: 0.7,
            windFromDirection: 137.7,
            precipitation: 0.0,
            weatherType: "cloudy"
        });
    });
});

describe('deserialiseWeeklySimpleForecast() Function Tests', () => {
   
    const mockedDate = new Date('2024-02-14T00:00:00Z');

    // System time must be mocked to ensure tests work as intended later on as well.
    beforeAll(() => {
        jest.useFakeTimers();
        jest.setSystemTime(mockedDate);
    });

    // Clears mocked system time as to not intefere with other tests.
    afterAll(() => {
        jest.useRealTimers();
    });

    it('correctly deserialises and formats weekly simple forecast data', () => {
        const result = deserialiseWeeklySimpleForecast(
            jsonResponse,
            TemperatureMeasurement.Celsius,
            PrecipitationMeasurement.Millimeters,
            WindSpeedMeasurement.MetersPerSecond
        );

        expect(result.latLng).toEqual([59.9139, 10.7522]);
        expect(result.currentForecast.dateTime).toEqual("2024-02-14T10:00:00Z");
        expect(result.dayTwoForecast.dateTime).toEqual("2024-02-15T12:00:00Z");
        expect(result.dayThreeForecast.dateTime).toEqual("2024-02-16T12:00:00Z");
        expect(result.dayFourForecast).toEqual({
            dateTime: "2024-02-17T12:00:00Z",
            temperature: 4.1,
            humidity: 61.2,
            windSpeed: 2.2,
            windFromDirection: 334.4,
            precipitation: 0.0,
            weatherType: "clearsky_day"
        });
        expect(result.dayFiveForecast.dateTime).toEqual("2024-02-18T12:00:00Z");
        expect(result.daySixForecast.dateTime).toEqual("2024-02-19T12:00:00Z");
        expect(result.daySevenForecast.dateTime).toEqual("2024-02-20T12:00:00Z");
    });
});

describe('deserialiseWeeklyDetailedForecast() Function Tests', () => {

    const mockedDate = new Date('2024-02-14T00:00:00Z');

    // System time must be mocked to ensure tests work as intended later on as well.
    beforeAll(() => {
        jest.useFakeTimers();
        jest.setSystemTime(mockedDate);
    });

    // Clears mocked system time as to not intefere with other tests.
    afterAll(() => {
        jest.useRealTimers();
    });

    it('correctly deserialises and formats weekly detailed forecast data', () => {
        const result = deserialiseWeeklyDetailedForecast(
            jsonResponse,
            TemperatureMeasurement.Celsius,
            PrecipitationMeasurement.Millimeters,
            WindSpeedMeasurement.MetersPerSecond
        );

        // Verify latLng is correctly reversed
        expect(result.latLng).toEqual([59.9139, 10.7522]);

        expect(result.dayOneForecast.hourlyForecasts['18HundredHours'].dateTime).toEqual("2024-02-14T18:00:00Z");
        expect(result.dayTwoForecast.hourlyForecasts['00HundredHours']).toEqual({
            dateTime: "2024-02-15T00:00:00Z",
            temperature: 1.8,
            humidity: 97.2,
            windSpeed: 0.7,
            windFromDirection: 137.7,
            precipitation: 0.0,
            weatherType: "cloudy"
        });
        expect(result.dayThreeForecast.hourlyForecasts['18HundredHours'].dateTime).toEqual("2024-02-16T18:00:00Z");
        expect(result.dayFourForecast.hourlyForecasts['12HundredHours']).toEqual({
            dateTime: "2024-02-17T12:00:00Z",
            temperature: 4.1,
            humidity: 61.2,
            windSpeed: 2.2,
            windFromDirection: 334.4,
            precipitation: 0.0,
            weatherType: "clearsky_day"
        });
        expect(result.dayFiveForecast.hourlyForecasts['18HundredHours'].dateTime).toEqual("2024-02-18T18:00:00Z");
        expect(result.daySixForecast.hourlyForecasts['18HundredHours'].dateTime).toEqual("2024-02-19T18:00:00Z");
        expect(result.daySevenForecast.hourlyForecasts['18HundredHours'].dateTime).toEqual("2024-02-20T18:00:00Z");
    });
});

describe('calculateDailyHighTemperature() Function Tests', () => {
    it('calculates the highest temperature in a day with varying temperatures', () => {
        const forecast: DailyForecast = {
            latLng: [59.9139, 10.7522],
            hourlyForecasts: {
                '00HundredHours': { dateTime: "2024-02-15T00:00:00Z", temperature: 1.8 },
                '01HundredHours': { dateTime: "2024-02-15T01:00:00Z", temperature: 2.5 },
                '23HundredHours': { dateTime: "2024-02-15T23:00:00Z", temperature: 3.2 },
            }
        };

        const dailyHigh = calculateDailyHighTemperature(forecast);

        expect(dailyHigh).toBe(3.2);
    });

    it('handles empty forecast gracefully', () => {
        const forecast: DailyForecast = {
            latLng: [59.9139, 10.7522],
            hourlyForecasts: {}
        };

        const dailyHigh = calculateDailyHighTemperature(forecast);

        expect(dailyHigh).toBe(-Infinity)
    });

    it('ignores null hourly forecasts', () => {
        const forecast: DailyForecast = {
            latLng: [59.9139, 10.7522],
            hourlyForecasts: {
                '00HundredHours': null,
                '01HundredHours': { dateTime: "2024-02-15T01:00:00Z", temperature: 0.5 },
                '23HundredHours': null,
            }
        };

        const dailyHigh = calculateDailyHighTemperature(forecast);

        expect(dailyHigh).toBe(0.5);
    });

    it('calculates the highest temperature correctly when temperatures decrease throughout the day', () => {
        const forecast: DailyForecast = {
            latLng: [59.9139, 10.7522],
            hourlyForecasts: {
                '00HundredHours': { dateTime: "2024-02-15T00:00:00Z", temperature: 10.0 },
                '12HundredHours': { dateTime: "2024-02-15T12:00:00Z", temperature: 5.0 },
                '23HundredHours': { dateTime: "2024-02-15T23:00:00Z", temperature: 2.0 },
            }
        };

        const dailyHigh = calculateDailyHighTemperature(forecast);

        expect(dailyHigh).toBe(10.0);
    });
});

describe('calculateDailyLowTemperature() Function Tests', () => {
    it('calculates the lowest temperature in a day with varying temperatures', () => {
        const forecast: DailyForecast = {
            latLng: [59.9139, 10.7522],
            hourlyForecasts: {
                '00HundredHours': { dateTime: "2024-02-15T00:00:00Z", temperature: 3.5 },
                '01HundredHours': { dateTime: "2024-02-15T01:00:00Z", temperature: 2.5 },
                '23HundredHours': { dateTime: "2024-02-15T23:00:00Z", temperature: 1.2 },
            }
        };

        const dailyLow = calculateDailyLowTemperature(forecast);

        expect(dailyLow).toBe(1.2);
    });

    it('returns Infinity for an empty forecast', () => {
        const forecast: DailyForecast = {
            latLng: [59.9139, 10.7522],
            hourlyForecasts: {}
        };

        const dailyLow = calculateDailyLowTemperature(forecast);

        expect(dailyLow).toBe(Infinity);
    });

    it('ignores null hourly forecasts and identifies the lowest temperature', () => {
        const forecast: DailyForecast = {
            latLng: [59.9139, 10.7522],
            hourlyForecasts: {
                '00HundredHours': null,
                '01HundredHours': { dateTime: "2024-02-15T01:00:00Z", temperature: 5.0 },
                '23HundredHours': null,
            }
        };

        const dailyLow = calculateDailyLowTemperature(forecast);

        expect(dailyLow).toBe(5.0);
    });

    it('calculates the lowest temperature correctly when temperatures increase throughout the day', () => {
        const forecast: DailyForecast = {
            latLng: [59.9139, 10.7522],
            hourlyForecasts: {
                '00HundredHours': { dateTime: "2024-02-15T00:00:00Z", temperature: 2.0 },
                '12HundredHours': { dateTime: "2024-02-15T12:00:00Z", temperature: 5.0 },
                '23HundredHours': { dateTime: "2024-02-15T23:00:00Z", temperature: 10.0 },
            }
        };

        const dailyLow = calculateDailyLowTemperature(forecast);

        expect(dailyLow).toBe(2.0);
    });
});
