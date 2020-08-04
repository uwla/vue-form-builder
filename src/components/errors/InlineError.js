import { isFunction } from "../../helpers";

export default {
    name: "InlineErrors",
    computed: {
        hasError() {
			if (isFunction(this.form.fieldHasError))
				return this.form.fieldHasError(this.field)
			else
				return false
        },

        errors() {
			if (isFunction(this.form.getFieldErrors))
				return this.form.getFieldErrors(this.field).slice(0, this.maxErrors)
			else
				return []
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
            validator: value => value > 0
        }
    }
};
