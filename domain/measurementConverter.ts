import { BeeCountMeasurement, TemperatureMeasurement, WeightMeasurement, WindSpeedMeasurement } from "@/constants/Measurements";

export const celsiusToFahrenheit = (celsiusValue: number): number => {
    return (celsiusValue * 9 / 5) + 32;
}

export const millimetersToCentimeters = (millimeterValue: number): number => {
    return millimeterValue / 10;
}

export const millimetersToInches = (millimeterValue: number): number => {
    return millimeterValue / 25.4;
}

export const metersPerSecondToKnots = (metersPerSecondValue: number): number => {
    return metersPerSecondValue * 1.94384;
};

export const metersPerSecondToMilesPerHour = (metersPerSecondValue: number): number => {
    return metersPerSecondValue * 2.23694;
};

export const metersPerSecondToKilometersPerHour = (metersPerSecondValue: number): number => {
    return metersPerSecondValue * 3.6;
};

export const gramsToKilograms = (gramsValue: number): number => {
    return gramsValue / 1000;
};

export const gramsToOunces = (gramsValue: number): number => {
    return gramsValue / 28.3495;
};

export const gramsToPounds = (gramsValue: number): number => {
    return gramsValue / 453.592;
};

export const gramsToStones = (gramsValue: number): number => {
    return gramsValue / 6350.29;
};

export const convertTemperature = (temperature: number, fromUnit: TemperatureMeasurement, toUnit: TemperatureMeasurement): number => {
    if (fromUnit === toUnit) {
        return temperature;
    }
    if (fromUnit === TemperatureMeasurement.Celsius && toUnit === TemperatureMeasurement.Fahrenheit) {
        return (temperature * 9 / 5) + 32;
    }
    if (fromUnit === TemperatureMeasurement.Fahrenheit && toUnit === TemperatureMeasurement.Celsius) {
        return (temperature - 32) * 5 / 9;
    }

    return temperature;
}

/**
 * Converts a specific value to a Celsius measurement ready to be written to the database.
 * @param temperature The number value to be converted.
 * @param userPreference The measument that the value is currently in.
 * @returns Returns a number representing the converted value.
 */
export const convertTempToDbFormat = (temperature: number, currentFormat: TemperatureMeasurement): number => {
    switch (currentFormat) {
        case TemperatureMeasurement.Fahrenheit:
          return (temperature - 32) * 5 / 9;
        default:
          return temperature;
      }
}

/**
 * Converts a specific value to a Gram measurement ready to be written to the database.
 * @param weight The number value to be converted.
 * @param currentFormat The measument that the value is currently in.
 * @returns Returns a number representing the converted value.
 */
export const convertWeightToDbFormat = (weight: number, currentFormat: WeightMeasurement): number => {
    switch (currentFormat) {
        case WeightMeasurement.Kilograms:
            return weight / 1000;
        case WeightMeasurement.Ounces:
            return weight * 28.34952;
        case WeightMeasurement.Pounds:
            return weight * 453.592;
        case WeightMeasurement.Stones:
            return weight * 6350.29;
        default:
          return weight;
      }
}

/**
 * Converts a specific value to a Meters per second measurement ready to be written to the database.
 * @param windSpeed The number value to be converted.
 * @param currentFormat The measument that the value is currently in.
 * @returns Returns a number representing the converted value.
 */
export const convertWindSpeedToDbFormat = (windSpeed: number, currentFormat: WindSpeedMeasurement): number => {
    switch (currentFormat) {
        case WindSpeedMeasurement.KilometersPerHour:
            return windSpeed * 0.277778;
        case WindSpeedMeasurement.MilesPerHour:
            return windSpeed * 0.44704;
        case WindSpeedMeasurement.Knots:
            return windSpeed * 0.514444;
        default:
          return windSpeed;
      }
}

/**
 * Converts a specific value to a Per Second measurement ready to be written to the database.
 * @param count The number value to be converted.
 * @param currentFormat The measument that the value is currently in.
 * @returns Returns a number representing the converted value.
 */
export const convertBeeCountToDbFormat = (count: number, currentFormat: BeeCountMeasurement): number => {
    switch (currentFormat) {
        case BeeCountMeasurement.PerMinute:
            return count * 60;
        case BeeCountMeasurement.PerHour:
            return count * 3600;
        default:
          return count;
      }
}

/**
 * Converts Celsius values to the desired measurement specified as a parameter.
 * @param temperature The number value to be converted.
 * @param userPreference The measument for the unit to be converted to.
 * @returns Returns a number representing the converted value.
 */
export const convertTempFromDbFormat = (temperature: number, userPreference: TemperatureMeasurement): number => {
    switch (userPreference) {
        case TemperatureMeasurement.Fahrenheit:
            return (temperature * 9/5) + 32;
        default:
            return temperature;
    }
}

/**
 * Converts Gram values to the desired measurement specified as a parameter.
 * @param weight The number value to be converted.
 * @param userPreference The measument for the unit to be converted to.
 * @returns Returns a number representing the converted value.
 */
export const convertWeightFromDbFormat = (weight: number, userPreference: WeightMeasurement): number => {
    switch (userPreference) {
        case WeightMeasurement.Kilograms:
            return weight / 1000;
        case WeightMeasurement.Ounces:
            return weight * 0.035274;
        case WeightMeasurement.Pounds:
            return weight * 0.00220462;
        case WeightMeasurement.Stones:
            return weight * 0.000157473;
        default:
            return weight;
    }
}

/**
 * Converts Meters Per Second values to the desired measurement specified as a parameter.
 * @param windSpeed The number value to be converted.
 * @param userPreference The measument for the unit to be converted to.
 * @returns Returns a number representing the converted value.
 */
export const convertWindSpeedFromDbFormat = (windSpeed: number, userPreference: WindSpeedMeasurement): number => {
    switch (userPreference) {
        case WindSpeedMeasurement.KilometersPerHour:
            return windSpeed * 3.6;
        case WindSpeedMeasurement.MilesPerHour:
            return windSpeed * 2.23694;
        case WindSpeedMeasurement.Knots:
            return windSpeed * 1.94384;
        default:
            return windSpeed;
    }
}

/**
 * Converts Per Second values to the desired measurement specified as a parameter.
 * @param count The number value to be converted.
 * @param userPreference The measument for the unit to be converted to.
 * @returns Returns a number representing the converted value.
 */
export const convertBeeCountFromDbFormat = (count: number, userPreference: BeeCountMeasurement): number => {
    switch (userPreference) {
        case BeeCountMeasurement.PerMinute:
            return count / 60;
        case BeeCountMeasurement.PerHour:
            return count / 3600;
        default:
            return count;
    }
}
