// Setting up mocks.
jest.mock('@/domain/validation/coordinateValidation', () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock('axios');

// Clears each mock before each test is run.
beforeEach(() => {
    jest.mocked(axios.get).mockClear();
    (isValidCoordinates as jest.Mock).mockClear();
});

// Setting up the Axios mock inside beforeEach if necessary
beforeEach(() => {
    jest.mocked(axios.get).mockResolvedValue({ data: jsonResponse });
});

// Imports after mocks to avoid hoisting problems.
import axios from 'axios';
import { fetchWeatherForecast } from '@/data/api/weatherApi';
import isValidCoordinates from '@/domain/validation/coordinateValidation';
import * as jsonResponse from '@/assets/testResources/weatherApiResponse.json';

describe('Weather API Tests', () => {
    it('fetches weather forecast with valid coordinates', async () => {
        (isValidCoordinates as jest.Mock).mockReturnValue(true);
        const mockForecast = jsonResponse;

        const forecast = await fetchWeatherForecast({ lat: 59.9139, lng: 10.7522 });

        expect(forecast).toEqual(mockForecast);
        expect(axios.get).toHaveBeenCalledTimes(1);
        expect(isValidCoordinates).toHaveBeenCalledWith(59.9139, 10.7522);
    });

    it('throws error with invalid coordinates', async () => {
        (isValidCoordinates as jest.Mock).mockReturnValue(false);

        await expect(fetchWeatherForecast({ lat: 123456, lng: 123456 }))
        .rejects.toThrow(`The coordinates '123456, 123456' are not valid.`);
        expect(axios.get).not.toHaveBeenCalled();
    });
});