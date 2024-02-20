import isValidCoordinates from "@/domain/validation/coordinateValidation";

interface WeatherApiProps {
  lat: number,
  lng: number
}

/**
 * Returns a full weather forecast for a specific geographical location.
 *
 * @remarks
 * The web-based REST API used is LocationForecast by Yr.
 * Documentation can be found here - https://api.met.no/weatherapi/locationforecast/2.0/documentation
 * 
 * @param lat - The latitude as a decimal value.
 * @param lng - The longitude as a decimal value.
 * @returns A weather forecast for the next 9-10 days in JSON format. Includes precipitation, 
 * temperature, wind speed, wind direction, humidity, and a weather symbol summarising each forecast.
 */
export const fetchWeatherForecast = async (props: WeatherApiProps) => {

  if (!isValidCoordinates(props.lat, props.lng)) {
    console.error(`The coordinates '${props.lat}, ${props.lng}' are not valid.`)
    throw new Error(`The coordinates '${props.lat}, ${props.lng}' are not valid.`)
  }

  try {
    const response = await fetch(
      `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${props.lat}&lon=${props.lng}`
    );

    const json = await response.json();

    return json;
  } catch (error) {
    // TODO
    console.error(error)
  }
};