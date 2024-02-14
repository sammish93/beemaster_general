import { extractForecastData } from '@/domain/weatherForecastDeserialiser'; // Adjust the import path accordingly
import { TemperatureMeasurement, PrecipitationMeasurement, WindSpeedMeasurement } from '@/constants/Measurements'; // Adjust the import path
import * as jsonResponse from '@/assets/testResources/weatherApiResponse.json';

describe('extractForecastData Function Tests', () => {

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
  