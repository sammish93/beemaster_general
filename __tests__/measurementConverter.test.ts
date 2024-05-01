import { TemperatureMeasurement, WeightMeasurement, WindSpeedMeasurement, BeeCountMeasurement } from '@/constants/Measurements';
import {
  celsiusToFahrenheit,
  millimetersToCentimeters,
  millimetersToInches,
  metersPerSecondToKnots,
  metersPerSecondToMilesPerHour,
  metersPerSecondToKilometersPerHour,
  gramsToKilograms,
  gramsToOunces,
  gramsToPounds,
  gramsToStones,
  convertBeeCountFromDbFormat,
  convertBeeCountToDbFormat,
  convertTempFromDbFormat,
  convertTempToDbFormat,
  convertWeightFromDbFormat,
  convertWeightToDbFormat,
  convertWindSpeedFromDbFormat,
  convertWindSpeedToDbFormat,
} from '@/domain/measurementConverter';

describe('Measurement Converter Tests', () => {
    it('converts celsius to fahrenheit', () => {
        expect(celsiusToFahrenheit(0)).toBe(32);
        expect(celsiusToFahrenheit(100)).toBeCloseTo(212);
    });

    it('converts millimeters to centimeters', () => {
        expect(millimetersToCentimeters(10)).toBe(1);
    });

    it('converts millimeters to inches', () => {
        expect(millimetersToInches(25.4)).toBeCloseTo(1);
    });

    it('converts meters per second to knots', () => {
        expect(metersPerSecondToKnots(1)).toBeCloseTo(1.94384);
    });

    it('converts meters per second to miles per hour', () => {
        expect(metersPerSecondToMilesPerHour(1)).toBeCloseTo(2.23694);
    });

    it('converts meters per second to kilometers per hour', () => {
        expect(metersPerSecondToKilometersPerHour(1)).toBeCloseTo(3.6);
    });

    it('converts grams to kilograms', () => {
        expect(gramsToKilograms(1000)).toBe(1);
    });

    it('converts grams to ounces', () => {
        expect(gramsToOunces(28.3495)).toBeCloseTo(1);
    });

    it('converts grams to pounds', () => {
        expect(gramsToPounds(453.592)).toBeCloseTo(1);
    });

    it('converts grams to stones', () => {
        expect(gramsToStones(6350.29)).toBeCloseTo(1);
    });
});

describe('Conversion functions to database format', () => {
    describe('Temperature conversions to Celsius', () => {
        it('converts Fahrenheit to Celsius', () => {
            expect(convertTempToDbFormat(212, TemperatureMeasurement.Fahrenheit)).toBeCloseTo(100);
        });
    
        it('returns Celsius when current format is default', () => {
            expect(convertTempToDbFormat(100, TemperatureMeasurement.Celsius)).toBe(100);
        });
    });
  
    describe('Weight conversions to grams', () => {
        it('converts kilograms to grams', () => {
            expect(convertWeightToDbFormat(1, WeightMeasurement.Kilograms)).toBe(0.001);
        });
    
        it('converts ounces to grams', () => {
            expect(convertWeightToDbFormat(1, WeightMeasurement.Ounces)).toBeCloseTo(28.34952);
        });
    
        it('converts pounds to grams', () => {
            expect(convertWeightToDbFormat(1, WeightMeasurement.Pounds)).toBeCloseTo(453.592);
        });
    
        it('converts stones to grams', () => {
            expect(convertWeightToDbFormat(1, WeightMeasurement.Stones)).toBeCloseTo(6350.29);
        });
    
        it('returns grams when current format is default', () => {
            expect(convertWeightToDbFormat(1, WeightMeasurement.Grams)).toBe(1);
        });
    });
  
    describe('Wind speed conversions to meters per second', () => {
        it('converts kilometers per hour to meters per second', () => {
            expect(convertWindSpeedToDbFormat(3.6, WindSpeedMeasurement.KilometersPerHour)).toBeCloseTo(1);
        });
    
        it('converts miles per hour to meters per second', () => {
            expect(convertWindSpeedToDbFormat(1, WindSpeedMeasurement.MilesPerHour)).toBeCloseTo(0.44704);
        });
    
        it('converts knots to meters per second', () => {
            expect(convertWindSpeedToDbFormat(1, WindSpeedMeasurement.Knots)).toBeCloseTo(0.514444);
        });
    
        it('returns meters per second when current format is default', () => {
            expect(convertWindSpeedToDbFormat(1, WindSpeedMeasurement.MetersPerSecond)).toBe(1);
        });
    });
  
    describe('Bee count conversions to per second', () => {
        it('converts per minute to per second', () => {
            expect(convertBeeCountToDbFormat(60, BeeCountMeasurement.PerMinute)).toBe(3600);
        });
    
        it('converts per hour to per second', () => {
            expect(convertBeeCountToDbFormat(1, BeeCountMeasurement.PerHour)).toBe(3600);
        });
    
        it('returns per second when current format is default', () => {
            expect(convertBeeCountToDbFormat(1, BeeCountMeasurement.PerSecond)).toBe(1);
        });
    });
});
  
describe('Conversion functions from database format', () => {
    describe('Temperature conversions from Celsius', () => {
        it('converts Celsius to Fahrenheit', () => {
            expect(convertTempFromDbFormat(100, TemperatureMeasurement.Fahrenheit)).toBeCloseTo(212);
        });

        it('returns Celsius when user preference is default', () => {
            expect(convertTempFromDbFormat(100, TemperatureMeasurement.Celsius)).toBe(100);
        });
    });

    describe('Weight conversions from grams', () => {
        it('converts grams to kilograms', () => {
            expect(convertWeightFromDbFormat(1000, WeightMeasurement.Kilograms)).toBe(1);
        });

        it('converts grams to ounces', () => {
            expect(convertWeightFromDbFormat(1000, WeightMeasurement.Ounces)).toBeCloseTo(35.274);
        });

        it('converts grams to pounds', () => {
            expect(convertWeightFromDbFormat(1000, WeightMeasurement.Pounds)).toBeCloseTo(2.20462);
        });

        it('converts grams to stones', () => {
            expect(convertWeightFromDbFormat(1000, WeightMeasurement.Stones)).toBeCloseTo(0.157473);
        });

        it('returns grams when user preference is default', () => {
            expect(convertWeightFromDbFormat(1000, WeightMeasurement.Grams)).toBe(1000);
        });
    });

    describe('Wind speed conversions from meters per second', () => {
        it('converts meters per second to kilometers per hour', () => {
            expect(convertWindSpeedFromDbFormat(1, WindSpeedMeasurement.KilometersPerHour)).toBeCloseTo(3.6);
        });

        it('converts meters per second to miles per hour', () => {
            expect(convertWindSpeedFromDbFormat(1, WindSpeedMeasurement.MilesPerHour)).toBeCloseTo(2.23694);
        });

        it('converts meters per second to knots', () => {
            expect(convertWindSpeedFromDbFormat(1, WindSpeedMeasurement.Knots)).toBeCloseTo(1.94384);
        });

        it('returns meters per second when user preference is default', () => {
            expect(convertWindSpeedFromDbFormat(1, WindSpeedMeasurement.MetersPerSecond)).toBe(1);
        });
    });

    describe('Bee count conversions from per second', () => {
        it('converts per second to per minute', () => {
            expect(convertBeeCountFromDbFormat(1, BeeCountMeasurement.PerMinute)).toBeCloseTo(0.0166667);
        });

        it('converts per second to per hour', () => {
            expect(convertBeeCountFromDbFormat(1, BeeCountMeasurement.PerHour)).toBeCloseTo(0.000277778);
        });

        it('returns per second when user preference is default', () => {
            expect(convertBeeCountFromDbFormat(1, BeeCountMeasurement.PerSecond)).toBe(1);
        });
    });
});