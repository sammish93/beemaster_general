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
} from '@/domain/measurementConverter'; // Adjust the import path accordingly

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
