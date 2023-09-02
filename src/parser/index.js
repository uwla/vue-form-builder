import Attributes from './attributes'
import fieldAliases from '../aliases'
import { componentsBootstrap, componentsVfb } from './components'
import { bindThis, deepCopy, generateRandomDigits, getDefaultFieldValue, toTitleCase } from '../helpers'

export class Parser {
    /**
     * Create a new Parser instance.
     * 
     * @param {Object} options 
     */
    constructor(options={}) {
        // default field components
        if (options.useBootstrap)
            this.components = componentsBootstrap
        else
            this.components = componentsVfb
        
        // default wrapper component
        this.wrapper = options.wrapper || this.components.wrapper

        // helper to fix casual JS ugliness
        bindThis(this)
    }

    getFieldType(field) {
        if (field.type) return field.type
        if (field.props.type) return 'input'
        if (field.props.options) return 'select'
        return 'custom'
    }
    
    getFieldComponent(field) {
        return field.component || this.components[field.type]
    }
    
    getFieldComponentProps(field) {
        let props = {... field.props }
        if (!props.name)
            props.name = field.name
        if (!this.useBootstrap && field.label !== 'none' && !props.hidden) 
            props.id = 'VFB' + generateRandomDigits(10)
        return props
    }
    
    getFieldWrapperComponent(field) {
        let defaultWrapper = this.wrapper
        if (field.props.hidden === true)
            defaultWrapper = 'div'
        return field.componentWrapper || field.wrapper || defaultWrapper
    }
    
    getFieldWrapperComponentProps(field) {
        // if already set, return it
        if (field.propsWrapper)
            return field.propsWrapper

        // begin with empty props
        const props = {}

        // add label information
        if (field.label !== 'none' && !field.hidden)
        {
            if (field.props.id)
                props.labelFor = field.props.id
            if (field.label)
                props.label = field.label
            else if (field.name)
                props.label = toTitleCase(field.name)
        }

        if (field.type === 'checkbox')
            props.class = 'vfb-group-checkbox'

        return props
    }

    getFieldFeedbackComponent(field) {
        return field.componentFeedback || 'vfb-feedback'
    }

    getFieldFeedbackComponentProps(field) {
        return {
            validFeedbackComponent: this.components['feedbackValid'],
            invalidFeedbackComponent: this.components['feedbackInvalid'],
        }
    }

    getFieldValue(field) {
        return field.value || getDefaultFieldValue({}, field)
    }
    
    getFieldWithDefaults(field) {
        // if unset, initialize field prop
        if (! field.props)
            field.props = {}

        // get field type, which may depend on field props
        field.type = this.getFieldType(field)

        // get field component, which depends on field type
        field.component = this.getFieldComponent(field)

        // get field component props, which depends on field component
        field.props = this.getFieldComponentProps(field)

        // get field wrapper, which depends on field component
        field.componentWrapper = this.getFieldWrapperComponent(field)

        // get field wrapper props, which depends on field wrapper component
        field.propsWrapper = this.getFieldWrapperComponentProps(field)

        // get field feedback component, which depends on props
        field.componentFeedback = this.getFieldFeedbackComponent(field)
    
        // get field value, which depends on field component
        field.value = this.getFieldValue(field)

        // finally, return field
        return field
    }
    
    stringAttributeToObject(attribute) {
        for (let Attribute of Attributes)
            if (Attribute.isAttribute(attribute))
                return Attribute.stringAttributeToObject(attribute)
    }
    
    stringToFieldObject(str) {
        let attributes = fieldAliases.isAlias(str) ? fieldAliases.getAlias(str) : str

        if (typeof attributes === 'object')
            return attributes

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
        field = this.getFieldWithDefaults(field)
    
        return field
    }
    
    parseFields(fields) {
        return fields.map(this.parseField)
    }
}