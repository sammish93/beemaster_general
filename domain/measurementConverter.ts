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

export const convertTempToDbFormat = (temperature: number, userPreference: TemperatureMeasurement): number => {
    switch (userPreference) {
        case TemperatureMeasurement.Fahrenheit:
          return (temperature * 9/5) + 32;
        default:
          return temperature;
      }
}

export const convertWeightToDbFormat = (weight: number, userPreference: WeightMeasurement): number => {
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

export const convertWindSpeedToDbFormat = (windSpeed: number, userPreference: WindSpeedMeasurement): number => {
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

export const convertBeeCountToDbFormat = (count: number, userPreference: BeeCountMeasurement): number => {
    switch (userPreference) {
        case BeeCountMeasurement.PerMinute:
            return count * 60;
        case BeeCountMeasurement.PerHour:
            return count * 3600;
        default:
          return count;
      }
}

export const convertTempFromDbFormat = (temperature: number, userPreference: TemperatureMeasurement): number => {
    switch (userPreference) {
        case TemperatureMeasurement.Fahrenheit:
            return (temperature * 9/5) + 32;
        default:
            return temperature;
    }
}

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

export const convertBeeCountFromDbFormat = (count: number, userPreference: BeeCountMeasurement): number => {
    switch (userPreference) {
        case BeeCountMeasurement.PerMinute:
            return count * 60;
        case BeeCountMeasurement.PerHour:
            return count * 3600;
        default:
            return count;
    }
}
