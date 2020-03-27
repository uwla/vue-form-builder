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

function toTitleCase(string) {
    return string.charAt(0).toUpperCase() +
        string.slice(1).replace(/[-_]/g, " ").replace(/([a-z])([A-Z])/g, "$1 $2")
}
