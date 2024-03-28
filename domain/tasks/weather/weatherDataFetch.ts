import { fetchWeatherForecast } from "@/data/api/weatherApi";
import { Hive } from "@/models/hive";

export const fetchWeatherForHive = async (hive: Hive) => {
    return await fetchWeatherForecast(hive.latLng);
}