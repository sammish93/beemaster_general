import { WeatherType } from "@/constants/WeatherTypes";
import getWeatherTypeIconFromString from "@/domain/weatherIconMapper";

describe('Weather Icon Mapper Tests', () => {
    it('returns the correct WeatherType for a valid weather type name', () => {
        const weatherType = getWeatherTypeIconFromString('rain');
        expect(weatherType).toEqual(WeatherType.rain);
    });

    it('throws an error for an invalid weather type', () => {
        const name = 'baconSandwich'
        expect(() => {
            getWeatherTypeIconFromString(name);
        }).toThrow(`'${name}' is not a valid weather type.`);
    });
});
