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
    if (field.type) return field.type
    if (field.options) return 'select'
    return 'input'
}

function getFieldComponent(field) {
    const type2component = {
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

    return type2component[field.type]
}

function getFieldComponentProps(field) {
    let props = field.htmlAttributes || {}
    if (! props.name)
        props.name = field.name
    if (['select', 'checkbox', 'radio'].includes(field.type))
        return { ...props, options: field.options, }
    return props
}

function getFieldWrapperComponent(field) {
    return BFormGroup
}

function getFieldWrapperComponentProps(field) {
    if (! field.name) return {}
    return { label: field.label || capitalize(field.name) }
}

function assignDefaultAttributesToField(field) {
    if (! field.type)
        field.type = getFieldElement(field)
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
    let attributes = fieldAliases.isAlias(str) ? fieldAliases.getAlias(str) : str
    let attributeArray = attributes.split('|')
    let attributeObject = {}
    let field = {}

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
    // convert a field into an object, or copy it
    if (typeof field === 'string')
        field = stringToFieldObject(field)
    else
        field = {... field}

    // assign some default attributes to the field
    assignDefaultAttributesToField(field)

    return field
}

function parseFields(fields) {
    return fields.map(parseField)
}

export { parseFields }
