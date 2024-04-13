import axios from 'axios';
import isValidCoordinates from "../../domain/validation/coordinateValidation";
import { Platform } from 'react-native';

interface WeatherApiProps {
  lat: number,
  lng: number
}

// The reason for using axios over React Native's fetch API is because axios allows us to edit 
// the user agent. Yr's APIs block a number of default (or undefined) user agents which can throw 
// errors, especially in Expo Go.
export const fetchWeatherForecast = async (props: WeatherApiProps) => {
  if (!isValidCoordinates(props.lat, props.lng)) {
    console.error(`The coordinates '${props.lat}, ${props.lng}' are not valid.`)
    throw new Error(`The coordinates '${props.lat}, ${props.lng}' are not valid.`)
  }

  try {
    if (Platform.OS === "web") {
      const response = await axios.get(`https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${props.lat}&lon=${props.lng}`);
    
      return response.data;
    } else {
      const response = await axios.get(`https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${props.lat}&lon=${props.lng}`, {
        headers: {
          'User-Agent': 'BeemasterGeneral/1.0'
        }
      });
      
      return response.data;
    }    
  } catch (error) {
    console.error(error);
    throw error;
  }
};
