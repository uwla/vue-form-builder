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

/**
 * Convert a string to title case (first letter capitalized, words separated by space)
 *
 * @param {string} str
 * @return {sting}
 */
function toTitleCase(str) {
    return str.charAt(0).toUpperCase() +
        str.slice(1).replace(/[-_]/g, " ").replace(/([a-z])([A-Z])/g, "$1 $2")
}
