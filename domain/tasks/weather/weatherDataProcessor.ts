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

export const getWeatherConditions = (weeklyForecast: WeeklySimpleForecast) => {
    return [
        weeklyForecast.currentForecast.weatherType,
        weeklyForecast.dayTwoForecast.weatherType,
        weeklyForecast.dayThreeForecast.weatherType,
        weeklyForecast.dayFourForecast.weatherType,
        weeklyForecast.dayFiveForecast.weatherType,
        weeklyForecast.daySixForecast.weatherType,
        weeklyForecast.daySevenForecast.weatherType,
    ];
}

export const getDailyWeatherConditionsFromHourly = (dailyForecast: DailyForecast) => {
    const hourlyForecasts = Object.values(dailyForecast.hourlyForecasts);
    const transformedForecasts = hourlyForecasts.map(forecastPeriod => ({
        temperature: forecastPeriod.temperature,
        humidity: forecastPeriod.humidity,
        windSpeed: forecastPeriod.windSpeed,
    }));

    return transformedForecasts;
}
 
export const getDailyTemperatureData = (dailyForecast: DailyForecast) => {
    return Object.values(dailyForecast).map(forecast => forecast.temperature);
}

export const getDailyHumidityData = (dailyForecast: DailyForecast) => {
    return Object.values(dailyForecast).map(forecast => forecast.humidity);
}