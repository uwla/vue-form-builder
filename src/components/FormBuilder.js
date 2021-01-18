import { parseFields } from "../parser";

/**
 * The following block of code is used to automatically import our
 * Vue components. It will recursively scan this directory for the
 * components and register them with the file basename.
 */
const files = require.context("./", true, /\.vue$/i);
const components = {};
files.keys().forEach(key => {
	let component, componentName = key.split("/").pop().split(".")[0];
	if (componentName !== "FormBuilder") {
		component = files(key).default;
		components[componentName] = component;
	}
});

export default {
	name: "FormBuilder",
	components,
	computed: {
		formFields() {
			let fields = parseFields(this.fields);
			fields.forEach(field => {
				if (! field.class) {
					field.class = this.fieldClass;
				}
				if (this.model[field.name] !== undefined) {
					field.value = this.model[field.name];
				}
			});
			return fields;
		},
		/* a flat array of errors */
		errorList() {
			let errorList = [];
			for (let fieldErrors of Object.keys(this.vErrors)) {
				for (let error of this.vErrors[fieldErrors]) {
					errorList.push(error);
				}
			}
			return errorList;
		}
	},
	data() {
		return {
			vErrors: {},
			vErrorMessage: ""
		};
	},
	methods: {
		updateFieldValue(field) {
			const target = window.event.target;
			if (Array.isArray(this.model[field.name])) {
				this.updateFieldOptions(field, target.value);
			} else if (field.type === "file") {
				this.model[field.name] = target.files[0];
			} else {
				this.model[field.name] = target.value;
			}
		},
		/* update a field of type select or checkbox */
		updateFieldOptions(field, value) {
			let index = this.model[field.name].indexOf(value);
			if (index === -1) {
				this.model[field.name].push(value);
			} else {
				this.model[field.name].splice(index, 1);
			}
		},
		fieldHasError(field) {
			return (
				Array.isArray(this.vErrors[field]) &&
				this.vErrors[field].length > 0
			);
		},
		clearErrors() {
			this.vErrors = {};
			this.vErrorMessage = "";
		}
	},
	props: {
		fields: {
			type: Array,
			required: true
		},
		fieldClass: {
			type: String,
			default: "form-control"
		},
		fieldGroupClass: {
			type: String,
			default: "form-group"
		},
		model: {
			type: Object,
			required: true
		},
		errors: {
			type: Object,
			default: () => ({})
		},
		errorMessage: {
			type: String,
			default: ""
		},
		formButtons: {
			type: Object,
			default: () => ({})
		},
		showButtons: {
			type: Boolean,
			default: true
		},
		showInlineErrors: {
			type: Boolean,
			default: true
		},
		showErrorList: {
			type: Boolean,
			default: false
		}
	},
	watch: {
		errors: {
			immediate: true,
			handler: function(value) {
				this.vErrors = value;
			},
		},
		errorMessage: {
			immediate: true,
			handler: function(value) {
				this.vErrorMessage = value;
			},
		},
	}
};
