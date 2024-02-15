export const isValidLatitude = (lat: number): boolean => {
    return lat >= -90.0 && lat <= 90.0;
}

export const isValidLongitude = (lng: number): boolean => {
    return lng >= -180.0 && lng <= 180.0;
}

/**
 * Checks whether or not coordinates are within a valid range.
 *
 * @remarks
 * Valid latitude values are between -90 and 90, while valid longitude values are between -180 and 180.
 * 
 * @param lat - The latitude as a decimal value.
 * @param lng - The longitude as a decimal value.
 * @returns A boolean value representing whether both the coordinates are within a valid range. A value 
 * of true represents valid coordinates.
 */
const isValidCoordinates = (lat: number, lng: number): boolean => {
    return isValidLatitude(lat) && isValidLongitude(lng);
}

export default isValidCoordinates