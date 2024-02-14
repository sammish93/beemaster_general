//TODO Test
export const celsiusToFahrenheit = (celsiusValue: number): number => {
    return (celsiusValue * 9/5) + 32;
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
