import { extractForecastData, getForecastDateFormat, getForecastDateTimeFormat, getHourlyForecastDateFormat } from '@/domain/weatherForecastDeserialiser'; // Adjust the import path accordingly
import { TemperatureMeasurement, PrecipitationMeasurement, WindSpeedMeasurement } from '@/constants/Measurements'; // Adjust the import path
import * as jsonResponse from '@/assets/testResources/weatherApiResponse.json';

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
    // Mocked initial date for the test suite
    const mockedDate = new Date('2024-02-15T12:00:00Z');

    beforeAll(() => {
        jest.useFakeTimers();
        jest.setSystemTime(mockedDate);
    });

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
