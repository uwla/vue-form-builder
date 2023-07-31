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
        },
        submitForm() {
            const data = {}
            for (let field of this.fieldsParsed)
                if (field.name) data[field.name] = field.value
            this.$emit('submit', data)
        },
        resetForm() {
            this.syncWithModel()
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
            default: true,
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