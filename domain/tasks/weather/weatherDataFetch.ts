import { WeatherApiProps, fetchWeatherForecast } from "@/data/api/weatherApi";
import { HiveModel } from "@/models/hiveModel";

export const fetchWeatherForHive = async (hive: HiveModel) => {
    return await fetchWeatherForecast(hive.latLng as WeatherApiProps);
}