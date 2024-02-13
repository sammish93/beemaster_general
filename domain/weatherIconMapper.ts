import { WeatherType } from "@/constants/WeatherType";

const getWeatherTypeIconFromString = (name: string): WeatherType => {
    if (name in WeatherType) {
        return WeatherType[name as keyof typeof WeatherType];
    }

    throw new Error(`'${name}' is not a valid weather type.`);
}

export default getWeatherTypeIconFromString