import {toTitleCase} from '../helpers'

export default {
    name: "FormLabel",

    computed: {
        id() {
            return this.field.id || this.field.name
        },

        labelText() {
            return this.field.label || toTitleCase(this.field.name)
        }
    },

    props: {
        field: {
            type: Object,
            required: true
        }
    }
}
