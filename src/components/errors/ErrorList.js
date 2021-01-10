export default {
	name: "AlertErrorList",
	computed: {
		errors() {
			return this.model.getErrorsAsArray();
		},
		hasError() {
			return this.model.hasError();
		},
		errorMessage() {
			return this.model.getErrorMessage()
		},
		shouldDisplayMessage() {
			return this.hasError && this.errorMessage !== "";
		},
	},
	methods: {
		dismiss() {
			if (this.dismissible) {
				this.model.clearErrors()
			}
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
		model: {
			type: Object,
			required: true
		},
	}
};
