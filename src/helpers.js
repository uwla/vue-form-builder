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
 * Indicates whether a string represents a numeric value.
 *
 * @param {String} str
 * @return {Boolean} 
 */
export function isNumeric(str) {
    if (typeof str !== 'string') return false
    let val = Number(str)
    return !isNaN(val) && isFinite(val);
}

/**
 * Cast a string to Boolean or Number
 *
 * @param {Any} value
 * @return {Any}
 */
export function castValue(value) {
    if (value === 'true') return true
    if (value === 'false') return false
    if (isNumeric(value)) return Number(value)
    return value
}

/**
 * Indicates whether the given value is nullable or empty.
 *
 * @param {Any} value
 * @return {Boolean} 
 */
export function isNullable(value) {
    return (value === null) ||
        (value === '') ||
        (value === undefined) || 
        (Array.isArray(value) && value.length === 0) ||
        (typeof value === 'object' && !isFile(value) && Object.values(value).every(isNullable))
}

/**
 * Shuffle the given array
 *
 * @param {Array} array
 * @return {Array} 
 */
export function shuffleArray(array) {
    array = [...array]
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export function getDefaultFieldValue(model, field) {
    let { name, type, props } = field
    if (name && model[name] !== undefined)
        return model[name]
    if (type === 'checkboxes' || type === 'tags')
        return []
    if (type === 'checkbox')
        return false
    if (props.options && props.multiple)
        return []
    if (props.options)
        return ''
    if (type === 'textarea')
        return ''
    if (['text', 'email', 'password', 'url'].includes(props.type))
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
 * @param {Number} n The amount of digits
 * @return {*}
 */
export function generateRandomDigits(n) {
    return Math.random().toString().substring(2).substring(0, n)
}

/**
 * Determine if the given value is a file
 *
 * @param {Any} value
 * @return {Boolean}
 */
export function isFile(value) {
    return value instanceof File || value instanceof Blob
}

/**
 * Determine if the given field has a file
 *
 * @param {Object} field
 * @return {Boolean}
 */
export function fieldHasFile(field) {
    let { value } = field
    if (Array.isArray(value)) return value.some(isFile)
    return isFile(value)
}

/**
 * Convert the data object to form data
 *
 * @param {Object} data
 * @return {FormData}
 */
export function toFormData(data)
{
    let formData = new FormData()
    for (let key of Object.keys(data))
    {
        let val = data[key]
        if (Array.isArray(val))
            val.forEach(item => formData.append(`${key}[]`, item))
        else
            formData.append(key, val)
    }
    return formData
}

/**
 * Reset the HTML inputs of the given form field.
 * 
 * @param {Object} form 
 * @param {Object} field 
 * @return {void}
 */
export function resetFormField(form, field)
{
    let name = field.name
    if (!name) return

    // toggle the checked state of multiple checkboxes
    if (field.type === 'checkboxes') {
        let checkboxes = form.querySelectorAll(`[name=${name}]`)
        for (let checkbox of checkboxes)
            checkbox.checked = field.value.includes(checkbox.value)
        return
    }
    
    // toggle the checked state of multiple radio inputs
    if (field.type === 'radio') {
        let options = form.querySelectorAll(`[name=${name}]`)
        for (let radio of options)
            radio.checked = (field.value === radio.value)
        return
    }
    
    // toggle the selected state of multiple select options
    if (field.type === 'select' && field.props.multiple) {
        let options = form.querySelectorAll(`[name=${name}] option`)
        for (let option of options)
            option.selected = field.value.includes(option.value)
        return
    } 

    // We have handled all multi-input fields.
    // Handle single input now.
    let input = form.querySelector(`[name=${name}]`)
    if (!input) return
    
    // toggle the checked state if input is checkbox
    if (field.type === 'checkbox')
        input.checked = field.value === true

    // otherwise, input must be string, so just make values equal
    else
        input.value = field.value
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