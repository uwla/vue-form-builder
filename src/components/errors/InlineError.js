export default {
    name: "InlineErrors",
    computed: {
        hasError() {
			return this.model.fieldHasError(this.field)
        },

        errors() {
			return this.model.getFieldErrors(this.field)
        }
    },

    props: {
        model: {
            type: Object,
			required: true
        },
        field: {
            type: String,
            required: true
        },
    }
};
