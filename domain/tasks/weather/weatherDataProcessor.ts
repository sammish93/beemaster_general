import { 
    deserialiseCurrentForecast,
    deserialiseDailyForecast,
    deserialiseWeeklySimpleForecast
} 
from "@/domain/weatherForecastDeserialiser";

export const processWeatherDataForHive = async (hiveWeatherData: any) => {
    const currentForecast = deserialiseCurrentForecast(hiveWeatherData);
    const dailyForecast = deserialiseDailyForecast(hiveWeatherData);
    const weeklyForecast = deserialiseWeeklySimpleForecast(hiveWeatherData);

    return { currentForecast, dailyForecast, weeklyForecast };
}