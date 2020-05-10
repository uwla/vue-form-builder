/**
 * The following block of code is be used to automatically register our
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 */
const files = require.context('./', true, /\.vue$/i)
const components = {}

files.keys().forEach(key => {
	let componentName = key.split('/').pop().split('.')[0]

	if (componentName !== "FormBuilder") {
		let component = files(key).default
		components[componentName] = component
	}
})

// import helpers
import fieldParser from '../fieldParser'

export default {
	name: "FormBuilder",

	components,

	computed: {
		formFields() {
			return this.fields.map(field => {
				field = fieldParser.getFieldObject(field)

				if (this.form[field.name])
					field.value = this.form[field.name]

				return field
			});
		},
	},

	methods: {
		/**
		 * Update the field value in the form object
		 *
		 * @param {object} field
		 * @return {void}
		 */
		updateFormField(field) {
			let target = window.event.target, value = target.value;

			if (Array.isArray(this.form[field.name]))
				this.updateFieldOptions(field, value)
			else if (field.type === "file")
				this.form[field.name] = target.files[0]
			else
				this.form[field.name] = value
		},

		/**
		 * Update the field options in the form object
		 *
		 * @param {object} field
		 * @return {void}
		 */
		updateFieldOptions(field, value) {
			let index = this.form[field.name].indexOf(value)

			if (index === -1)
				this.form[field.name].push(value);
			else
				this.form[field.name].splice(index, 1)
		},

		/**
		 * Whether the request has error for the given field
		 *
		 * @param {String} field
		 * @return {Boolean}
		 */
		fieldHasError(field) {
			if (typeof this.form.requestFieldHasError === "function")
				return this.form.requestFieldHasError(field)
			return false
		}
	},

	props: {
		fields: {
			type: Array,
			required: true
		},
		form: {
			type: Object,
			default: () => ({})
		},
		enableButtons: {
			type: Boolean,
			default: true,
		},
		formButtons: {
			type: Object,
			default: () => ({})
		},
		inlineErrors: {
			type: Boolean,
			default: true,
		},
		errorList: {
			type: Boolean,
			default: false,
		}
	},
}
