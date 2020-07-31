import { isFunction } from "../../helpers";

export default {
    name: "InlineErrors",
    computed: {
        hasError() {
			if (isFunction(this.form.requestFieldHasError))
            	return this.form.requestFieldHasError(this.field)
        },

        errors() {
			if (isFunction(this.form.getRequestFieldErrors))
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
            validator: value => value > 0
        }
    }
};
