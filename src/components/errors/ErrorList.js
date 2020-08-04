import { isFunction, isString, stringNotEmpty } from "../../helpers";

export default {
	name: "AlertErrorList",
	computed: {
		errors() {
			if (isFunction(this.form.getErrorsAsArray))
				return this.form.getErrorsAsArray();
			else
				return []
		},

		hasError() {
			if (isFunction(this.form.hasError))
				return this.form.hasError();
			else
				return false
		},

		errorMessage() {
			if (isFunction(this.form.getErrorMessage))
				return this.form.getErrorMessage();
			else
				return this.defaultErrorMessage
		},

		shouldDisplayMessage() {
			return this.hasError && stringNotEmpty(this.errorMessage);
		},
	},

	methods: {
		dismiss() {
			if (this.dismissible && isFunction(this.form.clearErrors))
				this.form.clearErrors()
		}
	},

	props: {
		defaultErrorMessage: {
			type: String,
			default: "There were some problems with your input."
		},
		dismissible: {
			type: Boolean,
			default: true
		},
		form: {
			type: Object,
			required: true
		},
	}
};
