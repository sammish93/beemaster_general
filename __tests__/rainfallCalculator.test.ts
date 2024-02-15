import * as jsonResponse from '@/assets/testResources/weatherApiResponse.json';
import { calculateDailyRainfall } from '@/domain/rainfallCalculator';
import { getForecastDateFormat } from '@/domain/weatherForecastDeserialiser';

const mockedDate = new Date('2024-02-14T12:00:00Z');
  
// System time must be mocked to ensure tests work as intended later on as well.
beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(mockedDate);
});

// Clears mocked system time as to not intefere with other tests.
afterAll(() => {
    jest.useRealTimers();
});

describe('Rainfall Calculator Tests', () => {

    it('calculates total daily rainfall correctly', () => {
        const totalRainfall = calculateDailyRainfall(jsonResponse, getForecastDateFormat(2));

        // Rainfall at 00:00 - 6.5, 06:00 - 8.3, 12:00 - 8.9, 18:00 - 0
        expect(totalRainfall).toBeCloseTo(23.7);
    });

    it('handles days with missing timeseries data', () => {
        // Rainfall values are undefined if they exist in the past.
        // In this case the rainfall values before 12:00 on the 14th February 2024 don't exist.
        const totalRainfall = calculateDailyRainfall(jsonResponse, getForecastDateFormat(0));

        expect(totalRainfall).toBe(0);
    });

    it('calculates days with no rainfall correctly', () => {
        const totalRainfall = calculateDailyRainfall(jsonResponse, getForecastDateFormat(3));

        expect(totalRainfall).toBe(0);
    });
});
