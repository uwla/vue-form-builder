import { getDefaultFieldValue } from '../helpers'
import { parseFields } from '../parser'
import { BForm } from 'bootstrap-vue'

export default {
    components: { BForm },

    data() {
        return {
            fieldsParsed: []
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
            this.fieldsParsed = parseFields(this.fields)
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
