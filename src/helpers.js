/**
 * Capitalize the first letter and separate words by space
 * @param {String}
 * @returns {String}
 */
export function toTitleCase(str) {
    return str.charAt(0).toUpperCase() +
        str.slice(1).replace(/[-_]/gu, ' ').replace(/([a-z])([A-Z])/gu, '$1 $2')
}

/**
 * Capitalize the given string
 * @param {String}
 * @returns {String}
 */
export function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * Turn an array into an object with object keys and values equal to array values
 * @param {Array}
 * @returns {Object}
 */
export function reduceArrayToObject(array) {
    const object = { }
    for (let value of array)
        object[value] = value
    return object
}

export function getDefaultFieldValue(model, field) {
    let { name, options, type, htmlAttributes } = field
    if (name && model[name])
        return model[name]
    if (type === 'checkboxes' || type === 'tags')
        return []
    if (type === 'checkbox')
        return false
    if (options && htmlAttributes.multiple)
        return []
    if (options)
        return ''
    if (type === 'textarea')
        return ''
    if (['text', 'email', 'password', 'url'].includes(htmlAttributes.type))
        return ''
    return null
}

/**
 * Bind 'this' variable to object's class methods.
 *
 * @param {Object} obj
 * @return {void}
 */
export function bindThis(obj) {
    const prototype = Object.getPrototypeOf(obj)
    const methodNames = Object.getOwnPropertyNames(prototype)
    for (let method of methodNames)
        obj[method] = obj[method].bind(obj)
}

/**
 * Generate some random digits
 *
 * @export
 * @return {*}
 */
export function generateRandomDigits(n) {
    return Math.random().toString().substring(2).substring(0, n)
}

/**
 * Deep copy
 *
 * @param {*} obj
 * @return {*}
 */
export function deepCopy(obj) {
    if (obj === null || typeof obj !== 'object') {
        return obj
    }
    let copy
    if (Array.isArray(obj)) {
        copy = []
        for (let i = 0; i < obj.length; i++) copy[i] = deepCopy(obj[i])
    } else {
        copy = {}
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                copy[key] = deepCopy(obj[key])
            }
        }
    }
    return copy
}
