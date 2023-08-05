import Attributes from './attributes'
import fieldAliases from '../aliases'
import {
    bindThis,
    deepCopy,
    generateRandomDigits,
    getDefaultFieldValue,
    toTitleCase,
} from '../helpers'

export class Parser {
    /**
     * Dictionary: field type => VueFormBuilder component
     */
    componentsVfb = {
        checkbox: 'vfb-checkbox',
        checkboxes: 'vfb-checkboxes',
        feedbackInvalid: 'vfb-feedback-invalid',
        feedbackValid: 'vfb-feedback-valid',
        file: 'vfb-file',
        input: 'vfb-input',
        radio: 'vfb-radio',
        select: 'vfb-select',
        textarea: 'vfb-textarea',
        wrapper: 'vfb-group',
    }

    /**
     *  Dictionary: field type => BootstrapVue component
     */
    componentsBootstrap = {
        checkbox: 'b-form-checkbox',
        checkboxes: 'b-form-checkbox-group',
        datepicker: 'b-form-datepicker',
        feedbackInvalid: 'b-form-invalid-feedback',
        feedbackValid: 'b-form-valid-feedback',
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
    constructor(options={}) {
        // default field components
        if (options.useBootstrap)
            this.components = this.componentsBootstrap
        else
            this.components = this.componentsVfb
        
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
        if (!this.useBootstrap && field.label !== 'none') 
            props.id = 'VFB' + generateRandomDigits(10)
        return props
    }
    
    getFieldWrapperComponent(field) {
        let defaultWrapper = this.wrapper
        if (field.props.hidden === true)
            defaultWrapper = 'div'
        return field.componentWrapper || defaultWrapper
    }
    
    getFieldWrapperComponentProps(field) {
        // if already set, return it
        if (field.propsWrapper)
            return field.propsWrapper

        // begin with empty props
        const props = {}

        // add label information
        if (field.label !== 'none')
        {
            if (field.props.id)
                props.labelFor = field.props.id
            if (field.label)
                props.label = field.label
            else if (field.name)
                props.label = toTitleCase(field.name)
        }

        // add a CSS class that displays a field checkbox before the label
        if (field.type === 'checkbox')
            props.class = props.class || 'form-group-checkbox'

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