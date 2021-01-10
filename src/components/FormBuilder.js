import { parseFields } from "../parser";

/**
 * The following block of code is used to automatically import our
 * Vue components. It will recursively scan this directory for the
 * components and register them with the file basename.
 */
const files = require.context("./", true, /\.vue$/i);
const components = {};
files.keys().forEach((key) => {
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
			// set field value and css class
			fields.forEach((field) => {
				if (! field.class) {
					field.class = this.fieldClass;
				}
				if (this.model[field.name] !== undefined) {
					field.value = this.model[field.name];
				}
			});
			return fields;
		},
	},
	methods: {
		/**
		 * Update the field value in the form object
		 * @param {Object} field
		 * @return {void}
		 */
		updateField(field) {
			const target = window.event.target;
			if (Array.isArray(this.model[field.name])) {
				this.updateFieldOptions(field, target.value);
			} else if (field.type === "file") {
				this.model[field.name] = target.files[0];
			} else {
				this.model[field.name] = target.value;
			}
		},
		/**
		 * Update the field options in the form object
		 * @param {Object}
		 * @return {void}
		 */
		updateFieldOptions(field, value) {
			let index = this.model[field.name].indexOf(value);
			if (index === -1) {
				this.model[field.name].push(value);
			} else {
				this.model[field.name].splice(index, 1);
			}
		},
		/**
		 * Whether the given field has errors
		 * @param {String} field
		 * @return {Boolean}
		 */
		fieldHasError(field) {
			return this.model.fieldHasError(field);
		},
	},
	props: {
		fields: {
			type: Array,
			required: true,
		},
		fieldClass: {
			type: String,
			default: "form-control",
		},
		fieldGroupClass: {
			type: String,
			default: "form-group",
		},
		model: {
			type: Object,
			default: () => emptyModel,
		},
		formButtons: {
			type: Object,
			default: () => ({}),
		},
		showButtons: {
			type: Boolean,
			default: true,
		},
		showInlineErrors: {
			type: Boolean,
			default: true,
		},
		showErrorList: {
			type: Boolean,
			default: false,
		},
	},
};
// Since the model prop is optional,
// an empty model will be used if
// the user does not provided one
const emptyModel = {
	hasError() {
		return false;
	},
	fieldHasError(field) {
		return false;
	},
	getFieldErrors(field) {
		return [];
	},
	getErrorsAsArray() {
		return [];
	},
	getErrorMessage() {
		return "";
	},
	clearErrors() {
		//
	},
};
