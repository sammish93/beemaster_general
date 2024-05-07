import { 
    deserialiseCurrentForecast,
    deserialiseDailyForecast,
    deserialiseWeeklySimpleForecast
} 
from "@/domain/weatherForecastDeserialiser";
import { DailyForecast, WeeklySimpleForecast } from "@/models/forecast";

export const processWeatherDataForHive = async (hiveWeatherData: any) => {
    const currentForecast = deserialiseCurrentForecast(hiveWeatherData);
    const dailyForecast = deserialiseDailyForecast(hiveWeatherData);
    const weeklyForecast = deserialiseWeeklySimpleForecast(hiveWeatherData);

    return { currentForecast, dailyForecast, weeklyForecast };
}

export const getWeeklyTemperatureData = (weeklyForecast: WeeklySimpleForecast) => {
    return [
        weeklyForecast.currentForecast.temperature,
        weeklyForecast.dayTwoForecast.temperature,
        weeklyForecast.dayThreeForecast.temperature,
        weeklyForecast.dayFourForecast.temperature,
        weeklyForecast.dayFiveForecast.temperature,
        weeklyForecast.daySixForecast.temperature,
        weeklyForecast.daySevenForecast.temperature,
    ];
}

export const getWeatherConditions = (weeklyForecast: WeeklySimpleForecast, country: string) => {
    return [
        {forecast: weeklyForecast.currentForecast.weatherType, country: country},
        {forecast: weeklyForecast.dayTwoForecast.weatherType, country: country},
        {forecast: weeklyForecast.dayThreeForecast.weatherType, country: country},
        {forecast: weeklyForecast.dayFourForecast.weatherType, country: country},
        {forecast: weeklyForecast.dayFiveForecast.weatherType, country: country},
        {forecast: weeklyForecast.daySixForecast.weatherType, country: country},
        {forecast: weeklyForecast.daySevenForecast.weatherType, country: country},
    ];
}

export const getDailyWeatherConditionsFromHourly = (dailyForecast: DailyForecast, country: string) => {
    const hourlyForecasts = Object.values(dailyForecast.hourlyForecasts);
    const transformedForecasts = hourlyForecasts.map(forecastPeriod => ({
        temperature: forecastPeriod.temperature,
        windSpeed: forecastPeriod.windSpeed,
        country: country
    }));

    return transformedForecasts;
}
 
export const getDailyTemperatureData = (dailyForecast: DailyForecast) => {
    return Object.values(dailyForecast).map(forecast => forecast.temperature);
}

export const getDailyHumidityData = (dailyForecast: DailyForecast) => {
    return Object.values(dailyForecast).map(forecast => forecast.humidity);
}