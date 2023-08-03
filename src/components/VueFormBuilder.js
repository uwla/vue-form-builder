import { getDefaultFieldValue, resetFormField } from '../helpers'
import { Parser } from '../parser'

export default {
    computed: {
        formComponent() {
            if (this.useBootstrap) return 'b-form'
            return 'form'
        }
    },

    data() {
        return {
            fieldsParsed: [],
            feedbacks: {},
        }
    },

    methods: {
        applyErrors() {
            this.fieldsParsed = this.fieldsParsed.map(field => {
                let { name } = field
                if (! name) return field
                let errors = this.errors[name]
                field.componentProps.state = null
                this.feedbacks[name].errors = errors
                if (! errors) return field
                field.componentProps.state = false
                this.feedbacks[name].state = false
                // field.componentPropsFeedback.state = false
                // field.componentPropsFeedback.errors = errors
                return field
            })
        },
        applySuccess() {
            this.fieldsParsed = this.fieldsParsed.map(field => {
                let { name } = field
                if (! name) return field
                let message = this.messages[name]
                field.componentProps.state = null
                this.feedbacks[name].message = message
                if (! message) return field
                field.componentProps.state = true
                this.feedbacks[name].state = true
                // field.componentPropsFeedback.state = true
                // field.componentPropsFeedback.message = message
                return field
            })
        },
        syncWithModel() {
            for (let field of this.fieldsParsed)
            {
                if (! field.name) continue
                field.value = getDefaultFieldValue(this.model, field)
            }
        },
        parseFormFields() {
            const options = {
                useBootstrap: this.useBootstrap,
                wrapper: this.wrapper,
            }
            const parser = new Parser(options)
            this.fieldsParsed = parser.parseFields(this.fields)
            for (let field of this.fieldsParsed)
            {
                let { name } = field
                if (! name) continue
                this.feedbacks[name] = { ... field.componentPropsFeedback}
                this.feedbacks[name].state = null
                this.feedbacks[name].errors = this.errors[name]
                this.feedbacks[name].message = this.messages[name]
            }
        },
        validateForm() {
            let valid = true
            this.fieldsParsed = this.fieldsParsed.map(field => {
                let name = field.name
                if (! name) return field

                let validationFunction = this.validation[name]
                if (validationFunction === undefined) return field
                
                let validated = validationFunction(field.value)

                let errors = this.errors[name]
                // field.componentPropsFeedback.state = null
                field.componentProps.state = null
                this.feedbacks[name].state = null
                if (validated === false && errors)
                {
                    field.componentProps.state = false
                    this.feedbacks[name].state = false
                    this.feedbacks[name].errors = errors
                    // field.componentPropsFeedback.state = false
                    // field.componentPropsFeedback.errors = errors
                    valid = false
                }
                if (typeof validated === 'string')
                {
                    field.componentProps.state = false
                    this.feedbacks[name].state = false
                    this.feedbacks[name].errors = validated
                    // field.componentPropsFeedback.state = false
                    // field.componentPropsFeedback.errors = validated
                    valid = false
                }
                return field
            })

            return valid
        },
        submitForm() {
            let valid = true

            // validate the form if specified
            if (this.validate)
                valid = this.validateForm()

            // don't submit the form if invalid
            if (! valid) return

            const data = {}
            for (let field of this.fieldsParsed)
                if (field.name) data[field.name] = field.value
            this.$emit('submit', data)
        },
        resetForm() {
            this.syncWithModel()
            const form = this.$refs['form']
            this.fieldsParsed.forEach(field => resetFormField(form, field))
        },
    },

    mounted() {
       this.parseFormFields()
       this.syncWithModel()
    },

    props: {
        errors: {
            type: Object,
            required: false,
            default: () => ({})
        },
        messages: {
            type: Object,
            required: false,
            default: () => ({}),
        },
        validate: {
            type: Boolean,
            default: true,
        },
        validation: {
            type: Object,
            required: false,
            default: () => ({}),
        },
        model: {
            type: Object,
            required: false,
            default: () => ({}),
        },
        fields: {
            type: Array,
            required: true
        },
        useBootstrap: {
            type: Boolean,
            default: false,
        },
        wrapper: {
            type: String,
            required: false,
            default: null,
        }
    },

    watch: {
        errors: {
            handler: 'applyErrors',
            immediate: false,
        },
        messages: {
            handler: 'applySuccess',
            immediate: false,
        },
        model: {
            handler: 'syncWithModel',
        },
        fields: {
            handler: 'parseFormFields',
        }
    }
}
