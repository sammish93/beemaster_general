// Setting up mocks.
jest.mock('@/domain/validation/coordinateValidation', () => ({
    __esModule: true,
    default: jest.fn(),
}));

global.fetch = jest.fn(() =>
    Promise.resolve(new Response(JSON.stringify(jsonResponse)))
) as jest.Mock;

// Clears each mock before each test is run.
beforeEach(() => {
    (fetch as jest.Mock).mockClear();
    (isValidCoordinates as jest.Mock).mockClear();
});

// Imports after mocks to avoid hoisting problems.
import { fetchWeatherForecast } from '@/data/api/weatherApi';
import isValidCoordinates from '@/domain/validation/coordinateValidation';
import * as jsonResponse from '@/assets/testResources/weatherApiResponse.json';

test('fetches weather forecast with valid coordinates', async () => {
    (isValidCoordinates as jest.Mock).mockReturnValue(true);
    const mockForecast = jsonResponse;

    const forecast = await fetchWeatherForecast({ lat: 59.9139, lng: 10.7522 });

    expect(forecast).toEqual(mockForecast);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(isValidCoordinates).toHaveBeenCalledWith(59.9139, 10.7522);
});

test('throws error with invalid coordinates', async () => {
    (isValidCoordinates as jest.Mock).mockReturnValue(false);

    await expect(fetchWeatherForecast({ lat: 123456, lng: 123456 }))
    .rejects.toThrow(`The coordinates '123456, 123456' are not valid.`);
    expect(fetch).not.toHaveBeenCalled();
});