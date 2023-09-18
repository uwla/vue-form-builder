import './types'

export function toTitleCase(str: string): string {
    return str.charAt(0).toUpperCase() +
        str.slice(1).replace(/[-_]/gu, ' ').replace(/([a-z])([A-Z])/gu, '$1 $2')
}

export function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

export function isNumeric(str: any): boolean {
    if (typeof str !== 'string') return false
    let val = Number(str)
    return !isNaN(val) && isFinite(val)
}

export function castValue<T>(value: T): number|boolean|T {
    if (typeof value === 'string')
    {
        let str = value as string
        if (str === 'true') return true
        if (str === 'false') return false
        if (isNumeric(str)) return Number(str)
    }
    return value
}

export function isEmptyArray(value: any): boolean {
    return Array.isArray(value) && value.length === 0
}

export function isEmptyObject(value: any): boolean {
    return  (
        typeof value === 'object' &&
        Object.values(value).every(isNullable) &&
        !isFile(value)
    )
}

export function isNullable(value: any): boolean {
    return (
        value === '' ||
        value === null ||
        value === undefined ||
        isEmptyArray(value) ||
        isEmptyObject(value)
    )
}

export function shuffleArray<T>(array: T[]): T[] {
    array = [...array]
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        let tmp = array[i]
        array[i] = array[j]
        array[j] = tmp
    }
    return array
}

export function getDefaultFieldValue(model: Model, field: Field): any {
    let { name, type, props, value } = field
    if (name && model[name] !== undefined && type !== 'file')
        return model[name]
    if (value !== undefined)
        return value
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

// Bind 'this' variable to object's class methods.
export function bindThis(obj: any): void {
    const prototype = Object.getPrototypeOf(obj)
    const methodNames = Object.getOwnPropertyNames(prototype)
    for (let method of methodNames)
        obj[method] = obj[method].bind(obj)
}

export function generateRandomDigits(n: number): string {
    return Math.random().toString().substring(2).substring(0, n)
}

export function isFile(value: any): boolean {
    return value instanceof File || value instanceof Blob
}

export function fieldHasFile(field: Field): boolean {
    let { value } = field
    if (Array.isArray(value)) {
        return value.some(isFile)
    }
    return isFile(value)
}

export function toFormData(data: Data): FormData {
    let formData = new FormData()
    for (let key of Object.keys(data)) {
        let val = data[key]
        if (Array.isArray(val)) {
            val.forEach(item => formData.append(`${key}[]`, item))
        } else {
            formData.append(key, val)
        }
    }
    return formData
}

export function resetFormField(form: any, field: Field): void {
    let name = field.name
    if (!name) return

    // toggle the checked state of multiple checkboxes
    if (field.type === 'checkboxes') {
        let checkboxes = form.querySelectorAll(`[name=${name}]`)
        for (let checkbox of checkboxes) {
            checkbox.checked = field.value.includes(checkbox.value)
        }
        return
    }

    // toggle the checked state of multiple radio inputs
    if (field.type === 'radio') {
        let options = form.querySelectorAll(`[name=${name}]`)
        for (let radio of options) {
            radio.checked = (field.value === radio.value)
        }
        return
    }

    // toggle the selected state of multiple select options
    if (field.type === 'select' && field.props.multiple) {
        let options = form.querySelectorAll(`[name=${name}] option`)
        for (let option of options) {
            option.selected = field.value.includes(option.value)
        }
        return
    }

    // We have handled all multi-input fields.
    // Handle single input now.
    let input = form.querySelector(`[name=${name}]`)
    if (!input)
        return

    // toggle the checked state if input is checkbox
    // otherwise, input must be string, so just make values equal
    if (field.type === 'checkbox') {
        input.checked = (field.value === true)
    } else {
        input.value = field.value
    }
}

export function deepCopy<T>(obj: T): T {
    if (typeof obj !== 'object' || obj === null)
        return obj

    if (Array.isArray(obj))
        return (obj.map(item => deepCopy(item)) as unknown) as T

    const copiedObj = {} as T
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key))
            copiedObj[key] = deepCopy(obj[key])
    }

    return copiedObj
}