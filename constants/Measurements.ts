// These enums are used in order to allow the user which format they wish to display certain 
// measurements in.

export enum TemperatureMeasurement {
    Celsius = "°C",
    Fahrenheit = "°F"
}

export enum PrecipitationMeasurement {
    Millimeters = "mm",
    Centimeters = "cm",
    Inches = "in"
}

export enum WindSpeedMeasurement {
    MetersPerSecond = "m/s",
    Knots = "kn",
    MilesPerHour = "mph",
    KilometersPerHour = "km/h"
}

export enum WeightMeasurement {
    Grams = "g",
    Kilograms = "kg",
    Ounces = "℥",
    Pounds = "lb",
    Stones = "st"
}

export enum HumidityMeasurement {
    Percent = "%"
}

export enum BeeCountMeasurement {
    PerSecond = "p/s",
    PerMinute = "p/m",
    PerHour = "p/h"
}