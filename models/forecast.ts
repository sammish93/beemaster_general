// Interfaces intended to simplify working with forecasts.

interface Forecast {
    latLng: [number, number];
    currentForecast: ForecastPeriod;
    dayTwoForecast: ForecastPeriod;
    dayThreeForecast: ForecastPeriod;
    dayFourForecast: ForecastPeriod;
    dayFiveForecast: ForecastPeriod;
    daySixForecast: ForecastPeriod;
    daySevenForecast: ForecastPeriod;
}

interface ForecastPeriod {
    temperature: number;
    humidity: number;
    windSpeed: number;
    windFromDirection: number;
    precipitation: number;
    weatherType: string;
}

export default Forecast;