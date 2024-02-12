import isValidCoordinates, { isValidLatitude, isValidLongitude } from '@/domain/validation/coordinateValidation';


describe('Coordinate Validation Tests', () => {
  test('isValidLatitude should return true for valid latitude values', () => {
    expect(isValidLatitude(0.0)).toBeTruthy();
    expect(isValidLatitude(-90.0)).toBeTruthy();
    expect(isValidLatitude(90.0)).toBeTruthy();
  });

  test('isValidLatitude should return false for invalid latitude values', () => {
    expect(isValidLatitude(-91.0)).toBeFalsy();
    expect(isValidLatitude(91.0)).toBeFalsy();
  });

  test('isValidLongitude should return true for valid longitude values', () => {
    expect(isValidLongitude(0.0)).toBeTruthy();
    expect(isValidLongitude(-180.0)).toBeTruthy();
    expect(isValidLongitude(180.0)).toBeTruthy();
  });

  test('isValidLongitude should return false for invalid longitude values', () => {
    expect(isValidLongitude(-181.0)).toBeFalsy();
    expect(isValidLongitude(181.0)).toBeFalsy();
  });

  test('isValidCoordinates should return true for valid coordinate pairs', () => {
    expect(isValidCoordinates(0.0, 0.0)).toBeTruthy();
    expect(isValidCoordinates(-90.0, -180.0)).toBeTruthy();
    expect(isValidCoordinates(90.0, 180.0)).toBeTruthy();
  });

  test('isValidCoordinates should return false for invalid coordinate pairs', () => {
    expect(isValidCoordinates(-91.0, 0.0)).toBeFalsy();
    expect(isValidCoordinates(0.0, -181.0)).toBeFalsy();
    expect(isValidCoordinates(91.0, 0.0)).toBeFalsy();
    expect(isValidCoordinates(0.0, 181.0)).toBeFalsy();
    expect(isValidCoordinates(-91.0, -181.0)).toBeFalsy();
  });
});
