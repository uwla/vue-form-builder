import fieldAliases from '../aliases'
import { capitalize } from '../helpers'
import AttributeClasses from './attributes'
import {
    BFormTextarea,
    BFormFile,
    BFormInput,
    BFormSelect,
    BFormDatepicker,
    BFormTimepicker,
    BFormTags,
    BFormCheckboxGroup,
    BFormRadioGroup,
    BFormGroup
} from 'bootstrap-vue'

function getFieldElement(field) {
    if (field.options) return 'select'
    if (field.type) return 'input'
    return 'input'
}

function getFieldComponent(field) {
    const element2component = {
        checkbox: BFormCheckboxGroup,
        datapicker: BFormDatepicker,
        file: BFormFile,
        input: BFormInput,
        radio: BFormRadioGroup,
        select: BFormSelect,
        tags: BFormTags,
        textarea: BFormTextarea,
        timepicker: BFormTimepicker,
    }

    return element2component[field.element]
}

function getFieldComponentProps(field) {
    let props = field.htmlAttributes || {}
    if (['select', 'checkbox', 'radio'].includes(field.element))
        return { ...props, options: field.options, }
    if (field.element == 'input')
        return { ...props, type: field.type }
    return props
}

function getFieldWrapperComponent(field) {
    return BFormGroup
}

function getFieldWrapperComponentProps(field) {
    if (! field.name) return {}
    return { label: field.label || capitalize(field.name) }
}

function assignDefaultsToField(field) {
    if (! field.element)
        field.element = getFieldElement(field)
    if (! field.component)
        field.component = getFieldComponent(field)
    if (! field.componentProps)
        field.componentProps = getFieldComponentProps(field)
    if (! field.wrapperComponent)
        field.wrapperComponent = getFieldWrapperComponent(field)
    if (! field.wrapperComponentProps)
        field.wrapperComponentProps = getFieldWrapperComponentProps(field)
}

function stringAttributeToObject(attribute) {
    for (let AttributeType of AttributeClasses)
        if (AttributeType.isAttribute(attribute))
            return AttributeType.stringAttributeToObject(attribute)
}

function stringToFieldObject(str) {
    let attributes = fieldAliases.isAlias(str)
        ? fieldAliases.getAlias(str)
        : str
    let attributeObject = {}
    let field = {}

    let attributeArray = attributes.split('|')

    attributeArray.forEach(attribute => {
        attributeObject = stringAttributeToObject(attribute)
        for (let key in attributeObject)
        {
            let attributeValue = attributeObject[key]
            if (! field[key])
                field[key] = attributeValue
            else
                field[key] = {... field[key], ...attributeValue }
        }
    })

    return field
}

function parseField(field) {
    if (typeof field === 'string') field = stringToFieldObject(field)
    else field = {... field}
    assignDefaultsToField(field)
    return field
}

function parseFields(fields) {
    return fields.map(parseField)
}

export { parseFields }
