import { WeatherType } from "@/constants/WeatherType";

// TODO Add validation.
const getWeatherTypeIconFromString = (name: string): any => {
    if (name in WeatherType) {
        return WeatherType[name as keyof typeof WeatherType];
    }

    // TODO Add default behaviour.
    return WeatherType.clearsky_night;
}

export default getWeatherTypeIconFromString