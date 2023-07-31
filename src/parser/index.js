import fieldAliases from '../aliases'
import { bindThis, capitalize, deepCopy, generateRandomDigits } from '../helpers'
import AttributeClasses from './attributes'

export class Parser {
    /**
     * Dictionary: field type => html component
     */
    htmlComponents = {
        checkbox: 'vfb-checkbox',
        checkboxes: 'vfb-checkboxes',
        file: 'vfb-file',
        input: 'vfb-input',
        radio: 'vfb-input',
        select: 'vfb-select',
        textarea: 'vfb-textarea',
        wrapper: 'vfb-group',
    }

    /**
     *  Dictionary: field type => Bootstrap-vue component
     */
    bootstrapComponents = {
        checkbox: 'b-form-checkbox',
        checkboxes: 'b-form-checkbox-group',
        datepicker: 'b-form-datepicker',
        file: 'b-form-file',
        input: 'b-form-input',
        radio: 'b-form-radio-group',
        select: 'b-form-select',
        tags: 'b-form-tags',
        textarea: 'b-form-textarea',
        timepicker: 'b-form-timepicker',
        wrapper: 'b-form-group',
    }

    /**
     * Create a new Parser instance.
     * 
     * @param {Object} options 
     */
    constructor(options) {
        // default field components
        if (options.useBootstrap)
            this.components = this.bootstrapComponents
        else
            this.components = this.htmlComponents
        
        // default wrapper component
        this.wrapper = options.wrapper || this.components.wrapper

        // helper to fix casual JS ugliness
        bindThis(this)
    }

    getFieldType(field) {
        if (field.type) return field.type
        if (field.options) return 'select'
        if (field.htmlAttributes.type) return 'input'
        return 'custom'
    }
    
    getFieldComponent(field) {
        return this.components[field.type]
    }
    
    getFieldComponentProps(field) {
        let props = {... field.htmlAttributes }
        if (!props.name)
            props.name = field.name
        if (['select', 'checkboxes', 'radio'].includes(field.type))
            props.options = field.options
        if (!this.useBootstrap) 
            props.id = 'VFB' + generateRandomDigits(10)
        return props
    }
    
    getFieldWrapperComponent(field) {
        return this.wrapper
    }
    
    getFieldWrapperComponentProps(field) {
        const props = {}

        // add label information
        if (field.label !== 'none')
        {
            if (field.componentProps.id)
                props.labelFor = field.componentProps.id
            if (field.label)
                props.label = field.label
            else if (field.name)
                props.label = capitalize(field.name)
        }

        // add a CSS class that make a checkbox come before the label
        if (field.type === 'checkbox')
            props.class = props.class || 'form-group-checkbox'

        return props
    }
    
    assignDefaultAttributesToField(field) {
        if (! field.htmlAttributes)
            field.htmlAttributes = {}
        if (! field.type)
            field.type = this.getFieldType(field)
        if (! field.component)
            field.component = this.getFieldComponent(field)
        if (! field.componentProps)
            field.componentProps = this.getFieldComponentProps(field)
        if (! field.wrapperComponent)
            field.wrapperComponent = this.getFieldWrapperComponent(field)
        if (! field.wrapperComponentProps)
            field.wrapperComponentProps = this.getFieldWrapperComponentProps(field)
    }
    
    stringAttributeToObject(attribute) {
        for (let AttributeType of AttributeClasses)
            if (AttributeType.isAttribute(attribute))
                return AttributeType.stringAttributeToObject(attribute)
    }
    
    stringToFieldObject(str) {
        let attributes = fieldAliases.isAlias(str) ? fieldAliases.getAlias(str) : str
        let attributeArray = attributes.split('|')
        let attributeObject = {}
        let field = {}
    
        attributeArray.forEach(attribute => {
            attributeObject = this.stringAttributeToObject(attribute)
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
    
    parseField(field) {
        // convert a field into an object, or copy it
        if (typeof field === 'string')
            field = this.stringToFieldObject(field)
        else
            field = deepCopy(field)
    
        // assign some default attributes to the field
        this.assignDefaultAttributesToField(field)
    
        return field
    }
    
    parseFields(fields) {
        return fields.map(this.parseField)
    }
}