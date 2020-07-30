/**
 * Capitalize the first letter and separate words by space
 * @param {String}
 * @returns {String}
 */
export function toTitleCase(str) {
    return str.charAt(0).toUpperCase() +
        str.slice(1).replace(/[-_]/g, " ").replace(/([a-z])([A-Z])/g, "$1 $2");
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
 * Indicates whether a variable is an array
 * @param {*}
 * @returns {Boolean}
 */
export function isArray($var) {
	return Array.isArray($var);
}

/**
 * Indicates whether a variable is a string
 *
 * @param {*}
 * @returns {Boolean}
 */
export function isString($var) {
	return typeof $var === "string";
}

/**
 * Indicates whether a string is not empty
 * @param {*}
 * @returns {Boolean}
 */
export function stringNotEmpty(str) {
	return isString(str) && str !== "";
}

/**
 * Indicates whether a variable is an object
 * @param {*}
 * @returns {Boolean}
 */
export function isObject($var) {
	return (typeof $var === "object") && ! isArray($var) && $var !== null;
}


export function isFunction($var) {
	return typeof $var === "function";
}

/**
 * Cast array to object with object keys and values equal to array values
 * @param {Array}
 * @returns {Object}
 */
export function reduceArrayToObject(array) {
	return array.reduce((accumulator, value) => {
		accumulator[value] = value;
		return accumulator;
	}, {});
}
