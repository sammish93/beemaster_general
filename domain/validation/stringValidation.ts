/**
 * A function designed to validate a string. By default all letters and numbers from unicode-supported 
 * languages are allowed. Symbols can either be allowed or disallowed, as well as specifying the 
 * minimum and maximum length of the string.
 * @param input The string that is to be validated.
 * @param minLength The minimum amount of characters allowed.
 * @param maxLength The maximum amount of characters allowed.
 * @param isSymbolsAllowed Whether or not symbols are allowed.
 * @returns A boolean value whether or not the string is valid.
 */
export const isValidString = (input: string, minLength: number = 1, maxLength: number = 64, isSymbolsAllowed: boolean = false): boolean => {
    // Allows all letters and numbers from unicode-supported languages.
    // If isSymbolsAllowed is set to false then the presence of even a single symbol results in an invalid string.
    let regexPattern = ""

    if (isSymbolsAllowed) {
        regexPattern = `^[\\p{L}\\p{N}\\p{P}\\p{S}\\p{Z}]{${minLength},${maxLength}}$`
    } else {
        regexPattern = `^[\\p{L}\\p{N}]{${minLength},${maxLength}}$`
    }
    
    // 'u' for unicode.
    const regex = new RegExp(regexPattern, 'u');
  
    return regex.test(input);
}