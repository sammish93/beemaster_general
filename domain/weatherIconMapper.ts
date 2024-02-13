import { WeatherType } from "@/constants/WeatherType";

/**
 * 
 * @param name - The name of the weather type.
 * @returns Returns a WeatherType enum that contains a link to a local image resource - e.g. 
 * require(@/path/to/resource.png).
 * @throws Throws an error in the event that the weather type does not exist.
 */
const getWeatherTypeIconFromString = (name: string): WeatherType => {
    if (name in WeatherType) {
        return WeatherType[name as keyof typeof WeatherType];
    }

    throw new Error(`'${name}' is not a valid weather type.`);
}

export default getWeatherTypeIconFromString