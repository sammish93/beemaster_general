import { WeatherType } from "@/constants/WeatherTypes";

/**
 * A function to retrieve the path of a locally-stored .png representing a specific weather type.
 * @param name - The name of the weather type.
 * @returns Returns a WeatherType enum that contains a link to a local image resource - e.g. 
 * require(@/path/to/resource.png).
 * @throws Throws an error in the event that the weather type does not exist.
 */
const getWeatherTypeIconFromString = (name: string): WeatherType => {
    if (name in WeatherType) {
        return WeatherType[name as keyof typeof WeatherType];
    }

    console.error(`'${name}' is not a valid weather type.`)
    throw new Error(`'${name}' is not a valid weather type.`);
}

export default getWeatherTypeIconFromString