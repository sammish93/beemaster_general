// Interfaces intended to simplify working with forecasts.

export interface CurrentForecast {
    latLng: [number, number];
    currentForecast: ForecastPeriod;
}

export interface DailyForecast {
    latLng: [number, number];
    hourlyForecasts: { [key: string]: ForecastPeriod }
}

export interface WeeklySimpleForecast {
    latLng: [number, number];
    currentForecast: ForecastPeriod;
    dayTwoForecast: ForecastPeriod;
    dayThreeForecast: ForecastPeriod;
    dayFourForecast: ForecastPeriod;
    dayFiveForecast: ForecastPeriod;
    daySixForecast: ForecastPeriod;
    daySevenForecast: ForecastPeriod;
}

export interface WeeklyDetailedForecast {
    latLng: [number, number];
    dayOneForecast: DailyForecast;
    dayTwoForecast: DailyForecast;
    dayThreeForecast: DailyForecast;
    dayFourForecast: DailyForecast;
    dayFiveForecast: DailyForecast;
    daySixForecast: DailyForecast;
    daySevenForecast: DailyForecast;
}

interface ForecastPeriod {
    dateTime: string,
    temperature: number;
    humidity: number;
    windSpeed: number;
    windFromDirection: number;
    precipitation: number;
    weatherType: string;
}