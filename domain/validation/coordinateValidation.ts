import { Double } from "react-native/Libraries/Types/CodegenTypes";
// TODO Test these

export const isValidLatitude = (lat: Double): boolean => {
    return lat >= -90.0 && lat <= 90.0;
}

export const isValidLongitude = (lon: Double): boolean => {
    return lon >= -180.0 && lon <= 180.0;
}

/**
 * Checks whether or not coordinates are within a valid range.
 *
 * @remarks
 * Valid latitude values are between -90 and 90, while valid longitude values are between -180 and 180.
 * 
 * @param lat - The latitude as a decimal value.
 * @param lon - The longitude as a decimal value.
 * @returns A boolean value representing whether both the coordinates are within a valid range. A value 
 * of true represents valid coordinates.
 */
const isValidCoordinates = (lat: Double, lon: Double): boolean => {
    return isValidLatitude(lat) && isValidLongitude(lon);
}

export default isValidCoordinates