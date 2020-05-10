export default {
	name: "AlertErrorList",
	computed: {
		errors() {
			return this.form.getRequestErrorsAsArray()
		},

		errorMessage() {
			return (this.message !== "") ? this.message : this.defaultErrorMessage
		},

		hasError() {
			return this.form.requestHasError() && message === ""
		},

		message() {
			return this.form._errorMessage
		},

		shouldDisplayMessage() {
			return this.message !== "" || ! this.hasError
		},
	},

	methods: {
		dismiss() {
			if (this.dismissible)
				this.form.clearRequestErrors()
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
