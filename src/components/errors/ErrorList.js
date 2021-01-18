export default {
	name: "AlertErrorList",
	computed: {
		hasError() {
			return this.errorMessage !== "" || this.errors.length > 0;
		}
	},
	methods: {
		dismiss() {
			this.$emit("dismiss");
		}
	},
	props: {
		errors: {
			type: Array,
			required: true
		},
		errorMessage: {
			type: String,
			required: true
		}
	}
};
