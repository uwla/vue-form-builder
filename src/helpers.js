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
