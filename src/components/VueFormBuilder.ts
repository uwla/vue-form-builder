import { defineComponent } from 'vue'
import { deepCopy, fieldHasFile, getDefaultFieldValue, isNullable, resetFormField, stopEvent, toFormData } from '../helpers'
import { Parser } from '../parser'
import { ProviderService } from '../provider'

export default defineComponent({
    computed: {
        componentProvider() {
            return ProviderService.getProvider(this.provider)
        },
        formComponent() {
            return this.componentProvider['form']
        },
    },

    data() {
        return {
            fieldsParsed: [] as Field[],
            feedbacks: {} as any,
            parser: {} as Parser,
        }
    },

    methods: {
        clearFieldFeedback(field: Field) {
            let { name } = field
            if (! name) return
            field.props.state = null
            this.feedbacks[name].state = null
        },
        displayErrors() {
            this.fieldsParsed = this.fieldsParsed.map((field: Field)=> {
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
        getValues(): Data|FormData {
            let data = {} as Data

            // form fields
            let fields = this.fieldsParsed as Field[]

            // if omitNull is true, will emit nullable field values
            let { omitNull } = this
            for (let field of fields)
            {
                let { name, value } = field
                if (! name) continue
                if (isNullable(value) && omitNull) continue
                data[name] = value
            }

            // if data has file, convert it to FormData
            const hasFile = fields.some(fieldHasFile)
            if (hasFile)
                return toFormData(data)

            return data
        },
        handleInput(field: Field, value: any) {
            field.value = value
            if (this.clearFeedbackOnInput)
                this.clearFieldFeedback(field)
            if (this.validateOnInput)
                this.validateField(field)

            // determine if there is a field component which needs to access the
            // values of other form fields
            const needsValue = this.fieldsParsed.some(f => f.values === true)

            // if some field component needs to know the values of other fields,
            // pass them as props to the component
            if (needsValue) this.passValuesToFieldsAsProps()

            // emit value 
            if (this.modelValue !== null && field.name)
            {
                let newValue = deepCopy(this.modelValue) as any
                newValue[field.name] = value
                this.$emit('update:modelValue', newValue)
            }
        },
        initializeValues() {
            let defaults = this.defaults

            // the default values are overwritten by the modelValue
            if (this.modelValue != null)
                defaults = this.modelValue

            for (let field of this.fieldsParsed)
            {
                if (! field.name) continue
                field.value = getDefaultFieldValue(defaults, field)
            }
        },
        parseFormFields() {
            const options = {
                attachRandomId: (this.provider === 'vfb'),
                provider: this.provider,
                wrapper: this.wrapper,
            }

            this.parser = new Parser(options)
            this.fieldsParsed = this.parser.parseFields(this.fields)
            this.fieldsParsed = this.fieldsParsed.map(f => {
                if (f.model === true)
                    f.props.model = this.modelValue
                return f
            })
        },
        passValuesToFieldsAsProps() {
            // get the current values
            let values = {} as Data
            this.fieldsParsed.forEach(f => {
                if (f.name)
                    values[f.name] = f.value
            })

            // update the fields
            this.fieldsParsed = this.fieldsParsed.map(field => {
                if (field.values === true)
                    field.props.values = values
                return field
            })
        },
        resetForm(e : any) {
            // stop HTML form submission event
            stopEvent(e)

            // sync form with the values of the model
            this.resetValuesToDefaults()
            const form = this.$refs['form']
            this.fieldsParsed.forEach(field => resetFormField(form, field))

            // emit reset notice
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
        submitForm(e : any) {
            // stop HTML form submission event
            stopEvent(e)

            // whether form is valid
            let valid = true

            // validate the form if specified
            if (this.validateOnSubmit)
                valid = this.validateForm()

            // don't submit the form if invalid
            if (! valid) return

            // emit data
            this.$emit('submit', this.getValues())
        },
        resetValuesToDefaults() {
            this.setFieldValues(this.defaults)
        },
        setFieldValues(values: any) {
            const form = this.$refs['form']
            for (let field of this.fieldsParsed)
            {
                let { name, type } = field

                // field needs direct access to the model
                if (field.model === true)
                    field.props.model = this.modelValue

                // skip it if value for the current field is not defined,
                // or if its type is file type
                if (name == null || values[name] === undefined || type === 'file')
                    continue

                // skip it if value is equal
                if (field.value == values[name])
                    continue

                // update the value to match the model
                field.value = values[name]

                // force update the HTML accordingly
                resetFormField(form, field)
            }
        },
        syncValuesWithModel() {
            this.setFieldValues(this.modelValue)
        },
        validateField(field: Field) {
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
            this.fieldsParsed = this.fieldsParsed.map((field : any) => {
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
        defaults: {
            type: Object,
            required: false,
            default: () => ({}),
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
        modelValue: {
            type: Object,
            required: false,
            default: () => null,
        },
        omitNull: {
            type: Boolean,
            default: false,
        },
        provider: {
            type: String,
            default: 'vfb'
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
        modelValue: {
            handler: 'syncValuesWithModel',
            immediate: false,
        },
        provider: {
            handler: 'parseFormFields',
            immediate: false,
        },
    }
})
