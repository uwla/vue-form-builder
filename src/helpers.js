/**
 * Capitalize the first letter and separate words by space
 *
 * @param {string}
 * @return {sting}
 */
export function toTitleCase(str) {
    return str.charAt(0).toUpperCase() +
        str.slice(1).replace(/[-_]/g, " ").replace(/([a-z])([A-Z])/g, "$1 $2")
}

/**
 * Capitalize the given string
 *
 * @param {string}
 * @return {string}
 */
export function capitalize(str) {
	return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * Return whether a variable is an array
 *
 * @param {*} $variable
 * @return {Boolean}
 */
export function is_array($var) {
	return Array.isArray($var)
}

/**
 * Return whether a variable is an object
 *
 * @param {*} $variable
 * @return {Boolean}
 */
export function is_object($var) {
	return (typeof $var === "object") && !(is_array($var)) && $var !== null
}

/**
 * Reduce array values to object with keys equal to values
 *
 * @param {Array} array
 * @return {Object}
 */
export function reduceArrayToObject(array) {
	return array.reduce((object, value) => {
		object[value] = value
		return object
	}, {})
}
