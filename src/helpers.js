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
    if (model[field.name])
        return model[field.name]
    if (field.value != null)
        return field.value
    if (field.element == 'checkbox')
        return []
    if (field.options && field.htmlAttributes && field.htmlAttributes.multiple)
        return []
    if (field.options)
        return ''
    if (field.element == 'textarea')
        return ''
    if (['text', 'email', 'password', 'url'].includes(field.type))
        return ''
    return null
}