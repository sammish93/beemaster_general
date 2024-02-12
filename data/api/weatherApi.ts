import isValidCoordinates from "@/domain/validation/coordinateValidation";
import { Double } from "react-native/Libraries/Types/CodegenTypes";

interface WeatherApiProps {
  lat: Double,
  lon: Double
}

/**
 * Returns a full weather forecast for a specific geographical location.
 *
 * @remarks
 * The web-based REST API used is LocationForecast by Yr.
 * Documentation can be found here - https://api.met.no/weatherapi/locationforecast/2.0/documentation
 * 
 * @param lat - The latitude as a decimal value.
 * @param lon - The longitude as a decimal value.
 * @returns A weather forecast for the next 9-10 days in JSON format. Includes precipitation, 
 * temperature, wind speed, wind direction, humidity, and a weather symbol summarising each forecast.
 */
export const fetchWeatherForecast = async (props: WeatherApiProps) => {
    try {
      const response = await fetch(
        `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${props.lat}&lon=${props.lon}`
      );

      const json = await response.json();

      return json;
    } catch (error) {
      // TODO
      console.error(error)
    }
  };