/**
 * Validates if the given input is a number and meets the specified constraints.
 * @param input The input string to validate.
 * @param minChars Minimum number of characters the input should have, including signs.
 * @param maxChars Maximum number of characters the input can have, including signs.
 * @param minValue Minimum numeric value the input should have.
 * @param maxValue Maximum numeric value the input can have.
 * @returns True if the input meets all criteria, false otherwise.
 */
export const isValidNumber = (
  input: string,
  minChars: number,
  maxChars: number,
  minValue: number,
  maxValue: number
): boolean => {
  // Check for minimum and maximum character length
  if (input.length < minChars || input.length > maxChars) {
    return false;
  }

  // Try to convert the input into a number
  const numberInput = Number(input);

  // Check if the input is a valid number and within the specified range
  if (isNaN(numberInput) || numberInput < minValue || numberInput > maxValue) {
    return false;
  }

  // Regex to validate if the input is a numeric format (both integers and decimals)
  // This regex allows for an optional minus sign to allow for negative numbers
  const numericRegex = /^[-]?(\d+\.?\d*|\.\d+)$/;

  if (!numericRegex.test(input)) {
    return false;
  }

  return true;
};