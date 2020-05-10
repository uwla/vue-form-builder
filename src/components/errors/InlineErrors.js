export default {
    name: "InlineErrors",
    computed: {
        hasError() {
            return this.form.requestFieldHasError(this.field)
        },

        errors() {
			return this.form.getRequestFieldErrors(this.field).slice(0, this.maxErrors)
        }
    },

    props: {
        form: {
            type: Object,
            required: true
        },

        field: {
            type: String,
            required: true
        },

        maxErrors: {
            type: Number,
            default: 10,
            validator: value => value >= 1
        }
    }
};
