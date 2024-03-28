import { 
    deserialiseCurrentForecast,
    deserialiseDailyForecast,
    deserialiseWeeklySimpleForecast
} 
from "@/domain/weatherForecastDeserialiser";

export const processWeatherDataForHive = async (hiveWeatherData: any) => {
    const currentForecast = deserialiseCurrentForecast(hiveWeatherData);
    return { currentForecast };
}