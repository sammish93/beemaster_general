import { CurrentForecast, DailyForecast, WeeklySimpleForecast } from "./forecast";

export interface WeatherData {
    currentForecast: CurrentForecast,
    dailyForecast: DailyForecast,
    weeklyForecast: WeeklySimpleForecast
}