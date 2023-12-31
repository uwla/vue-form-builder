import Attributes from './attributes'
import Aliases from '../aliases'
import { bindThis, deepCopy, generateRandomDigits, getDefaultFieldValue, toTitleCase } from '../helpers'
import { ProviderService } from '../provider'

const defaultParserOptions : ParserOptions = {
    attachRandomId: true,
    provider: 'vfb',
}

export class Parser {
    components : ComponentProvider
    wrapper : VueComponent
    attachRandomId : Boolean

    /**
     * Create a new Parser instance.
     * 
     * @param {Object} options 
     */
    constructor(options : ParserOptions = defaultParserOptions) {
        this.attachRandomId = (options.attachRandomId === true)
        this.components = ProviderService.getProvider(options.provider)
        this.wrapper = options.wrapper || this.components['wrapper']

        // helper to fix casual JS ugliness
        bindThis(this)
    }

    getFieldType(field: Field): FieldType {
        if (field.type) return field.type
        if (field.props.type) return 'input'
        if (field.props.options) return 'select'
        return 'custom'
    }
    
    getFieldComponent(field: Field): VueComponent {
        return field.component || this.components[field.type]
    }
    
    getFieldComponentProps(field: Field): VueComponentProps {
        let props = {... field.props }
        if (!props.name)
            props.name = field.name
        if (this.attachRandomId && field.label !== 'none' && !props.hidden) 
            props.id = 'VFB' + generateRandomDigits(10)
        return props
    }
    
    getFieldWrapperComponent(field: Field): VueComponent {
        let defaultWrapper = this.wrapper
        if (field.props.hidden === true)
            defaultWrapper = 'div'
        return field.componentWrapper || field.wrapper || defaultWrapper
    }
    
    getFieldWrapperComponentProps(field: Field): VueComponentProps {
        // if already set, return it
        if (field.propsWrapper)
            return field.propsWrapper

        // begin with empty props
        const props : VueComponentProps = {}

        // add label information
        if (!field.props.hidden && field.label !== 'none')
        {
            if (field.props.id && !['radio', 'checkboxes'].includes(field.type))
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

    getFieldFeedbackComponent(field: Field): VueComponent {
        return field.componentFeedback || 'vfb-feedback'
    }

    getFieldFeedbackComponentProps(field: Field): VueComponentProps {
        return {
            validFeedbackComponent: this.components['feedbackValid'],
            invalidFeedbackComponent: this.components['feedbackInvalid'],
        }
    }

    getFieldValue(field: Field): FieldValue {
        return field.value || getDefaultFieldValue({}, field)
    }
    
    getFieldWithDefaults(field: Field): Field {
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
    
    stringToAttribute(attr: string): Attribute {
        for (let Attribute of Attributes)
            if (Attribute.isAttribute(attr))
                return Attribute.stringToAttribute(attr)
        throw new Error("Could not convert string to attribute")
    }
    
    stringToField(str: string): Field {
        let attributes = Aliases.isAlias(str) ? Aliases.getAlias(str) : str

        if (typeof attributes === 'object')
            return attributes

        let attrArray = attributes.split('|')
        let field : Field = {} as Field
    
        attrArray.forEach((attrStr : string) => {
            let attributeObject : Attribute = this.stringToAttribute(attrStr)
            for (let key in attributeObject)
            {
                let attributeValue : any = attributeObject[key]
                if (! Object(field).hasOwnProperty(key))
                    field[key] = attributeValue
                else
                    field[key] = {... field[key], ...attributeValue }
            }
        })
    
        return field
    }
    
    parseField(field: FieldDescription): Field {
        // convert a field into an object, or copy it
        if (typeof field === 'string')
            field = this.stringToField(field)
        else
            field = deepCopy(field)
    
        // assign some default attributes to the field
        field = this.getFieldWithDefaults(field)
    
        return field
    }
    
    parseFields(fields: FieldDescription[]): Field[] {
        return fields.map(this.parseField)
    }
}