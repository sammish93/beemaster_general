//TODO Test
export const celsiusToFarenheit = (celsiusValue: number): number => {
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
