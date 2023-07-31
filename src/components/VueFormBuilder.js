import { getDefaultFieldValue } from '../helpers'
import { Parser } from '../parser'

export default {
    data() {
        return {
            fieldsParsed: [],
        }
    },

    methods: {
        syncWithModel() {
            for (let field of this.fieldsParsed)
            {
                if (! field.name) continue
                let val = getDefaultFieldValue(this.model, field)
                field.value = val
            }
        },
        parseFormFields() {
            const options = {
                useBootstrap: this.useBootstrap,
                wrapper: this.wrapper,
            }
            const parser = new Parser(options)
            this.fieldsParsed = parser.parseFields(this.fields)
        },
        submitForm() {
            const data = {}
            for (let field of this.fieldsParsed)
                if (field.name) data[field.name] = field.value
            this.$emit('submit', data)
        },
        resetForm() {
            this.syncWithModel()

            const form = this.$refs['form']
            for (let field of this.fieldsParsed)
            {
                let name = field.name
                if (! name) continue

                if (field.type === 'checkboxes')
                {
                    let checkboxes = form.querySelectorAll(`[name=${name}]`)
                    for (let checkbox of checkboxes)
                        checkbox.checked = field.value.includes(checkbox.value)
                } else if (field.type === 'radio') {
                    let options = form.querySelectorAll(`[name=${name}]`)
                    for (let radio of options)
                        radio.checked = field.value === radio.value
                } else if (field.type === 'select' && field.componentProps.multiple) {
                    let options = form.querySelectorAll(`[name=${name}] option`)
                    for (let option of options)
                        option.selected = field.value.includes(option.value)
                } else {
                    let input = form.querySelector(`[name=${name}]`)
                    if (!input) return
                    input.value = field.value
                }
            }
        }
    },

    mounted() {
       this.parseFormFields()
       this.syncWithModel()
    },

    props: {
        model: {
            type: Object,
            required: false,
            default: () => ({})
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
        model: {
            handler: 'syncWithModel',
        },
        fields: {
            handler: 'parseFormFields',
        }
    }
}
