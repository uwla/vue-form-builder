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
            parser: {},
        }
    },

    methods: {
        displayErrors() {
            this.fieldsParsed = this.fieldsParsed.map(field => {
                // nameless field have no feedback
                let { name } = field
                if (! name) return field

                // clear field feedback
                this.clearFieldFeedback(field)

                // return if no errors
                let errors = this.errors[name]
                if (! errors) return field

                // update feedback
                this.feedbacks[name].errors = errors
                this.feedbacks[name].state = false
                field.props.state = false

                return field
            })
        },
        displayMessages() {
            this.fieldsParsed = this.fieldsParsed.map(field => {
                // nameless field have no feedback
                let { name } = field
                if (! name) return field

                // clear feedback
                this.clearFieldFeedback(field)

                // return if no message
                let message = this.messages[name]
                if (! message) return field

                // update feedback
                this.feedbacks[name].message = message
                this.feedbacks[name].state = true
                field.props.state = true

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
        clearFieldFeedback(field) {
            let { name } = field
            if (! name) return
            field.props.state = null
            this.feedbacks[name].state = null
        },
        handleInput(field) {
            if (this.clearFeedbackOnInput)
                this.clearFieldFeedback(field)
            if (this.validateOnInput)
                this.validateField(field)
        },
        parseFormFields() {
            const options = {
                useBootstrap: this.useBootstrap,
                wrapper: this.wrapper,
            }
            this.parser = new Parser(options)
            this.fieldsParsed = this.parser.parseFields(this.fields)
        },
        setupFeedback() {
            const { parser } = this
            for (let field of this.fieldsParsed)
            {
                // nameless fields have no feedback, so skip them
                let { name } = field
                if (! name) continue

                // set the properties for the feedback component,
                // some of which will be changed upon a feedback event.
                this.feedbacks[name] = parser.getFieldFeedbackComponentProps(field)
                this.feedbacks[name].state = null
                this.feedbacks[name].errors = this.errors[name]
                this.feedbacks[name].message = this.messages[name]
            }
        },
        validateField(field) {
            // if nameless field, return it
            let name = field.name
            if (!name) return field

            // if no validation function, return it
            let validationFunction = this.validation[name]
            if (validationFunction === undefined) return field

            // apply validation function
            let validated = validationFunction(field.value)

            // default error message
            let errors = this.errors[name]

            // set validation state to undefined
            field.props.state = null
            this.feedbacks[name].state = null

            // field is invalid and we show default error message
            if (validated === false && errors) {
                field.props.state = false
                this.feedbacks[name].state = false
                this.feedbacks[name].errors = errors
            }

            // field is invalid and we show the custom error returned
            if (typeof validated === 'string') {
                field.props.state = false
                this.feedbacks[name].state = false
                this.feedbacks[name].errors = validated
            }

            // finally, return the field
            return field
        },
        validateForm() {
            let valid = true
            this.fieldsParsed = this.fieldsParsed.map(field => {
                field = this.validateField(field)
                if (field.props.state === false)
                    valid = false
                return field
            })
            return valid
        },
        submitForm() {
            let valid = true

            // validate the form if specified
            if (this.validateOnSubmit)
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
       this.setupFeedback()
       this.syncWithModel()
    },

    props: {
        clearFeedbackOnInput: {
            type: Boolean,
            default: true,
        },
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
        validateOnSubmit: {
            type: Boolean,
            default: true,
        },
        validateOnInput: {
            type: Boolean,
            default: false,
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
            handler: 'displayErrors',
            immediate: false,
        },
        messages: {
            handler: 'displayMessages',
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
