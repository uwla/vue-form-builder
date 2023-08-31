import { fieldHasFile, getDefaultFieldValue, isNullable, resetFormField, toFormData } from '../helpers'
import { Parser } from '../parser'

export default {
    computed: {
        formComponent() {
            if (this.useBootstrap)
                return 'b-form'
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
        clearFieldFeedback(field) {
            let { name } = field
            if (! name) return
            field.props.state = null
            this.feedbacks[name].state = null
        },
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
        handleInput(field) {
            if (this.clearFeedbackOnInput)
                this.clearFieldFeedback(field)
            if (this.validateOnInput)
                this.validateField(field)
        },
        initializeValues() {
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
            this.parser = new Parser(options)
            this.fieldsParsed = this.parser.parseFields(this.fields)
        },
        resetForm() {
            this.syncWithModel()
            const form = this.$refs['form']
            this.fieldsParsed.forEach(field => resetFormField(form, field))
            this.$emit('reset')
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
        submitForm() {
            let valid = true

            // validate the form if specified
            if (this.validateOnSubmit)
                valid = this.validateForm()

            // don't submit the form if invalid
            if (! valid) return

            // event payload
            let data = {}

            // form fields
            let fields = this.fieldsParsed

            // if omitNull is true, will emit nullable field values
            let { omitNull } = this
            for (let field of fields)
            {
                let { name, value } = field
                if (! name) continue
                if (isNullable(value) && omitNull) continue
                data[field.name] = value
            }

            // if data has file, convert it to FormData
            const hasFile = fields.some(fieldHasFile)
            if (hasFile) data = toFormData(data)

            // emit data
            this.$emit('submit', data)
        },
        syncWithModel() {
            const form = this.$refs['form']
            const model = this.model
            for (let field of this.fieldsParsed)
            {
                let { name, type } = field
                if (name == null || model[name] === undefined || type === 'file')
                    continue
                field.value = model[name]
                resetFormField(form, field)
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

            // the default error message
            let errors = this.errors[name]

            // the default success message
            let message = this.messages[name]

            // set validation state to undefined
            field.props.state = null
            this.feedbacks[name].state = null

            // field is valid and we show default success message
            if (validated === true && message)
            {
                field.props.state = true
                this.feedbacks[name].state = true
                this.feedbacks[name].message = message
            }
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
    },

    mounted() {
       this.parseFormFields()
       this.setupFeedback()
       this.initializeValues()
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
        fields: {
            type: Array,
            required: true
        },
        messages: {
            type: Object,
            required: false,
            default: () => ({}),
        },
        model: {
            type: Object,
            required: false,
            default: () => ({}),
        },
        omitNull: {
            type: Boolean,
            default: false,
        },
        useBootstrap: {
            type: Boolean,
            default: false,
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
        fields: {
            handler: 'parseFormFields',
        },
        messages: {
            handler: 'displayMessages',
            immediate: false,
        },
        model: {
            handler: 'syncWithModel',
        },
    }
}