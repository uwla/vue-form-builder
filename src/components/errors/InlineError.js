export default {
	name: "InlineErrors",
	props: {
		errors: {
			type: Array,
			required: false,
			default: () => []
		}
	},
};
