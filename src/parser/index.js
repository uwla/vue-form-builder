import Attributes from './attributes'
import fieldAliases from '../aliases'
import {
    bindThis,
    capitalize,
    deepCopy,
    generateRandomDigits,
    getDefaultFieldValue,
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
    constructor(options) {
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
        if (field.options) return 'select'
        if (field.props.type) return 'input'
        return 'custom'
    }
    
    getFieldComponent(field) {
        return this.components[field.type]
    }
    
    getFieldComponentProps(field) {
        let props = {... field.props }
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

    getFieldFeedbackComponent(field) {
        return 'vfb-feedback'
    }

    getFieldFeedbackComponentProps(field) {
        return {
            validFeedbackComponent: this.components['feedbackValid'],
            invalidFeedbackComponent: this.components['feedbackInvalid'],
        }
    }
    
    assignDefaultAttributesToField(field) {
        if (! field.props)
            field.props = {}
        if (! field.type)
            field.type = this.getFieldType(field)
        if (! field.component)
            field.component = this.getFieldComponent(field)
        if (! field.componentProps)
            field.componentProps = this.getFieldComponentProps(field)
        if (! field.componentWrapper)
            field.componentWrapper = this.getFieldWrapperComponent(field)
        if (! field.componentPropsWrapper)
            field.componentPropsWrapper = this.getFieldWrapperComponentProps(field)
        if (! field.componentFeedback)
            field.componentFeedback = this.getFieldFeedbackComponent(field)
        if (! field.componentPropsFeedback)
            field.componentPropsFeedback= this.getFieldFeedbackComponentProps(field)
        if (! field.value)
            field.value = getDefaultFieldValue({}, field)
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
        this.assignDefaultAttributesToField(field)
    
        return field
    }
    
    parseFields(fields) {
        return fields.map(this.parseField)
    }
}