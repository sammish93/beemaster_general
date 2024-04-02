/**
 * A function designed to validate a string. By default all letters and numbers from unicode-supported 
 * languages are allowed. Symbols can either be allowed or disallowed, as well as specifying the 
 * minimum and maximum length of the string.
 * @param input The string that is to be validated.
 * @param minLength The minimum amount of characters allowed.
 * @param maxLength The maximum amount of characters allowed.
 * @param isSymbolsAllowed Whether or not symbols are allowed.
 * @param isSpaceAllowed Whether not not space characters are allowed.
 * @returns A boolean value whether or not the string is valid.
 */
export const isValidString = (
    input: string,
    minLength: number = 1,
    maxLength: number = 64,
    isSymbolsAllowed: boolean = false,
    isSpaceAllowed: boolean = true
  ): boolean => {
    // Check the string length first
    if (input.length < minLength || input.length > maxLength) {
      return false;
    }
  
    const basicPattern = /^[A-Za-z0-9\u00C0-\u00FF\u0100-\u017F]+$/;
    const spacePattern = /\s/;
    const symbolPattern = /[!@#$%^&*(),.?":{}|<>]/;
  
    for (let char of input) {
      const isLetterOrDigit = basicPattern.test(char);
      const isSpace = spacePattern.test(char);
      const isSymbol = symbolPattern.test(char);
  
      if (!isLetterOrDigit) {
        if (isSpace && !isSpaceAllowed) return false;
        if (isSymbol && !isSymbolsAllowed) return false;
        if (!isSpace && !isSymbol) return false;
      }
    }
  
    return true;
  };