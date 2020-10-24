/**
 * This file contains helper functions used
 * throughout the application.
 */

/**
 * Deep copy the given variable.
 *
 * @param  {*} variable
 * @return {Object}
 */
export function deepCopy(variable) {
	if (variable === null || typeof variable !== 'object')
		return variable

	let copy = isArray(variable) ? [] : {};

	Object.keys(variable).forEach(key => copy[key] = deepCopy(variable[key]))

	return copy
}

/**
 * Delete null properties of an object
 *
 * @param {Object} object
 * @return {void}
 */
export function deleteNullProps(object) {
	for (let key in object) {
		if (isNullable(object[key]))
			delete object[key]
	}
}

/**
 * Capitalize the first letter and separate words by space
 *
 * @param {String}
 * @returns {String}
 */
export function toTitleCase(str) {
    return str.charAt(0).toUpperCase() +
        str.slice(1).replace(/[-_]/g, " ").replace(/([a-z])([A-Z])/g, "$1 $2");
}

/**
 * Capitalize the given string
 *
 * @param {String}
 * @returns {String}
 */
export function capitalize(str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Indicates whether a variable is an array
 *
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
 *
 * @param {*}
 * @returns {Boolean}
 */
export function isObject($var) {
	return (typeof $var === "object") && ! isArray($var) && $var !== null;
}

/**
 * Indicates whether a variable is a function
 *
 * @param {*}
 * @returns {Boolean}
 */
export function isFunction($var) {
	return typeof $var === "function";
}

/**
 * Indicates if a variable has null value
 * @param {*} variable
 */
export function isNullable(variable) {
	return variable === "" || variable === null || typeof variable === "undefined";
}

/**
 * Indicates whether the value of a variable is not null
 * @param {*} variable
 */
export function isNotNull(variable) {
	return variable !== "" && variable != null && typeof variable !== "undefined";
}

/**
 * Indicates whether the given variables are all arrays
 *
 * @param {*} ...variables
 * @return {Boolean}
 */
export function areArrays(...variables) {
	return variables.every(isArray)
}

/**
 * Indicates whether the given variables are all objects
 *
 * @param {*} ...variables
 * @return {Boolean}
 */
export function areObjects(...variables) {
	return variables.every(isObject)
}

/**
 * Indicates whether the given variables are all strings
 *
 * @param {*} ...variables
 * @return {Boolean}
 */
export function areStrings(...variables) {
	return variables.every(isString)
}

/**
 * Merge multiple objects into a new one
 *
 * @param {Object} ...objects
 * @return {Object}
 */
export function mergeObjects(...objects) {
	let merged = {}

	for (let object of objects) {
		let commonProperties = []

		// merge properties that are
		// present in both objects
		for (let property in merged) {
			if (! object.hasOwnProperty(property))
				continue

			commonProperties.push(property)

			let prop1 = merged[property], prop2 = object[property]

			if (areArrays(prop1, prop2))
				merged[prop] = [...prop1, ...prop2]
			else if (areObjects(prop1, prop2))
				merged[prop] = mergeObjects(prop1, prop2)
			else
				merged[prop] = prop2
		}

		// merge properties of object that
		// are not present in merged
		for (let property in object) {
			if (! commonProperties.includes(property))
				merged[property] = object[property]
		}
	}

	return merged
}

/**
 * Cast array to object with object keys and values equal to array values
 *
 * @param {Array}
 * @returns {Object}
 */
export function reduceArrayToObject(array) {
	return array.reduce((accumulator, value) => {
		accumulator[value] = value;
		return accumulator;
	}, {});
}
