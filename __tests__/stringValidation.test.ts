import { isValidString } from "@/domain/validation/stringValidation";

describe('isValidString', () => {
    it('returns true for a valid string without symbols', () => {
        expect(isValidString('Example123', 1, 64, false)).toBeTruthy();
    });
  
    it('returns false for a string with symbols when symbols are not allowed', () => {
        expect(isValidString('Example@123', 1, 64, false)).toBeFalsy();
    });
  
    it('returns false for a string shorter than minLength', () => {
        expect(isValidString('', 1, 64, false)).toBeFalsy();
    });
  
    it('returns false for a string longer than maxLength', () => {
        expect(isValidString('a'.repeat(65), 1, 64, false)).toBeFalsy();
    });
  
    // Test cases when symbols are allowed
    it('returns true for a valid string with symbols', () => {
        expect(isValidString('Example@123', 1, 64, true)).toBeTruthy();
    });
  
    it('returns true for a string with various symbols and unicode characters', () => {
        expect(isValidString('Exæmplë@#$', 1, 64, true)).toBeTruthy();
    });
  
    // Testing edge cases for length
    it('returns true for a string letter exactly at minLength', () => {
        expect(isValidString('E', 1, 64, true)).toBeTruthy();
    });

    it('returns true for a string number exactly at minLength', () => {
        expect(isValidString('1', 1, 64, true)).toBeTruthy();
    });
  
    it('returns true for a string exactly at maxLength', () => {
        expect(isValidString('a'.repeat(64), 1, 64, true)).toBeTruthy();
    });
});