/**
 * Takes in a string with spaces and returns it in camel case format.
 * @param str The string to transform.
 * @returns A camel cased representation of the string.
 */
export const transformToCamelCase = (str: string): string => {

    const lowerCase = str.toLocaleLowerCase();
    const splitted = lowerCase.split(' ');

    const camelCased = splitted.map((word, index) => {
        return index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1);
    }).join('');

    return camelCased;
}