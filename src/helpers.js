/**
 * This file contains helper functions used
 * throughout the plugin.
 */

/**
 * Capitalize the first letter and separate words by space
 * @param {String}
 * @returns {String}
 */
export function toTitleCase(str) {
    return str.charAt(0).toUpperCase() +
        str.slice(1).replace(/[-_]/gu, " ").replace(/([a-z])([A-Z])/gu, "$1 $2");
}

/**
 * Capitalize the given string
 * @param {String}
 * @returns {String}
 */
export function capitalize(str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Turn an array into an object with object keys and values equal to array values
 * @param {Array}
 * @returns {Object}
 */
export function reduceArrayToObject(array) {
	return array.reduce((accumulator, value) => {
		accumulator[value] = value;
		return accumulator;
	}, {});
}
