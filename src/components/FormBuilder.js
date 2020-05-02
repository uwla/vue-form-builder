
import FormButtons from './FormButtons.vue'
import FormGroup from './FormGroup.vue'
import FormLabel from './FormLabel.vue'
import FormFieldInput from './form_fields/FormFieldInput.vue'
import FormFieldTextarea from './form_fields/FormFieldTextarea.vue'
import FormFieldCheckbox from './form_fields/FormFieldCheckbox.vue'
import FormFieldRadio from './form_fields/FormFieldRadio.vue'
import FormFieldSelect from './form_fields/FormFieldSelect.vue'
import fieldParser from '../FieldParser'

export default {
	name: "FormBuilder",

	components: {
		FormButtons,
		FormFieldCheckbox,
		FormFieldInput,
		FormFieldRadio,
		FormFieldSelect,
		FormFieldTextarea,
		FormGroup,
		FormLabel,
	},

	computed: {
		formFields() {
			return this.fields.map(field => fieldParser.getFieldObject(field));
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
	},
}
