
import FormButtons from './FormButtons.vue'
import FormGroup from './FormGroup.vue'
import FormLabel from './FormLabel.vue'
import FormFieldInput from './form_fields/FormFieldInput.vue'
import FormFieldTextarea from './form_fields/FormFieldTextarea.vue'
import FormFieldCheckbox from './form_fields/FormFieldCheckbox.vue'
import FormFieldRadio from './form_fields/FormFieldRadio.vue'
import FormFieldSelect from './form_fields/FormFieldSelect.vue'

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
		formFields () {
			return this.fields.map(field => {
				field = this.assignFieldDefaults({
					class: "form-control",
					...this.getFieldObject(field)
				})
				return {...field};
			});
		},

		fieldAliases() {
			if (window.formBuilderAliases)
				return {...this.aliases, ...window.formBuilderAliases}
			return this.aliases
		},
	},


	data() {
		return {
			booleanAttributes: [
				'autofocus', 'multiple', 'disabled', 'hidden', 'required', 'readonly'
			],
			elements: [
				'input', 'textarea', 'select',
			],
			fieldTypes: [
				'text', 'number', 'date', 'datetime-local', 'month', 'file', 'color', 'password', 'radio', 'range', 'url', 'email', 'checkbox', 'range', 'tel', 'time', 'week'
			],
			aliases: {
				name: "name:name|text",
				fname: "name:fname|text",
				lname: "name:lname|text",
				username: "name:username|text",
				email: "name:email|email",
				email_confirmation: "name:email_confirmation|email",
				password: "name:password|password",
				password_confirmation: "name:password_confirmation|password",
				age: "name:age|number",
				birthday: "name:birthday|date",
				photo: "name:photo|file|accept:image/*",
				picture: "name:picture|file|accept:image/*",
				profile_picture: "name:profile_picture|file|accept:image/*",
			}
		};
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
		 * Assign default values to the field object
		 *
		 * @param {object} field
		 * @return {object}
		 */
		assignFieldDefaults(field) {
			if (!field.element) {
				if (field.type)
					field.element = "input"
				else if (field.options)
					field.element = "select"
			}

			if (field.options && ["checkbox", "radio"].includes(field.type))
				field.component = "FormField" + capitalize(field.type)
			else
				field.component = "FormField" + capitalize(field.element)

			if (this.form[field.name])
				field.value = this.form[field.name]

			return field
		},

		/**
		 * Get a field object from a field string or a field object.
		 *
		 * @param {object|string} field
		 * @return {object}
		 */
		getFieldObject(field) {
			if (typeof field === "string")
				return this.parseStringToFieldObject(field)
			return field
		},

		/**
		 * Assign default values to the field object
		 *
		 * @param {string} fieldString
		 * @return {object}
		 */
		parseStringToFieldObject (fieldString) {
			let options = this.isAlias(fieldString) ? this.fieldAliases[fieldString] : fieldString

			return options.split("|").reduce((field, option) => {
				return {...field, ...this.parseFieldOptionToObject(option)}
			}, {});
		},

		/**
		 * Parse a field option string to a field option object
		 *
		 * @param {string} fieldOption
		 * @return {object}
		 */
		parseFieldOptionToObject (fieldOption) {
			let optionType = this.getOptionType(fieldOption)

			if (optionType == "html")
				return this.getHtmlAttributeObject(fieldOption)
			if (optionType == "html_boolean")
				return this.getBooleanAttributeObject(fieldOption)
			if (optionType == "field")
				return this.getFieldTypeObject(fieldOption)
			if (optionType == "element")
				return this.getElementTypeObject(fieldOption)
			if (optionType == "select_options")
				return this.getSelectOptionsObject(fieldOption)
		},

		/**
		 * Get the option type of a field option string
		 *
		 * @param {string} option
		 * @return {string}
		 */
		getOptionType(option) {
			if (this.isSelectOptions(option))
				return "select_options"
			if (this.isHtmlAttribute(option))
				return "html"
			if (this.isElementType(option))
				return "element"
			if (this.isFieldType(option))
				return "field"
			if (this.isBooleanAttribute(option))
				return "html_boolean"
			console.error("The field's prop were not passed in the right format.")
		},

		/**
		 * Get an object of a html boolean attribute from an atribite string
		 *
		 * @param {string} attribute
		 * @return {object}
		 */
		getBooleanAttributeObject(attribute) {
			return {[attribute]: true}
		},

		/**
		 * Get an object of a html attribute from an atribite string
		 *
		 * @param {string} attribute
		 * @return {object}
		 */
		getHtmlAttributeObject(attribute) {
			let key = attribute.split(":")[0],
				value = attribute.split(":")[1]
			return {[key]: value}
		},

		/**
		 * Get an object of field options from a string that is a JSON object
		 *
		 * @param {string} options
		 * @return {object}
		 */
		getSelectOptionsObject(options) {
			// the options variable has the
			// format 'options:OBJECT'
			// where OBJECT is a JSON object
			// so we remove the substring
			// 'options:' to parse the object
			options = JSON.parse(options.slice(8))
			return {options}
		},

		/**
		 * Get the html element of a field
		 *
		 * @param {string} element
		 * @return {object}
		 */
		getElementTypeObject(element) {
			return {element}
		},

		/**
		 * Get the object of a html type attribute of an input field
		 *
		 * @param {string} type
		 * @return {object}
		 */
		getFieldTypeObject(type) {
			return {type}
		},

		/**
		 * Return whether a field property repŕesents a boolean attribute
		 *
		 * @param {string} property
		 * @return {boolean}
		 */
		isBooleanAttribute(property) {
			return this.booleanAttributes.includes(property)
		},

		/**
		 * Return whether a field property represents the tag name of a html element
		 *
		 * @param {string} property
		 * @return {boolean}
		 */
		isElementType (property) {
			return this.elements.includes(property)
		},

		/**
		 * Return whether a field property represents a html type attribute of an input element
		 *
		 * @param {string} property
		 * @return {boolean}
		 */
		isFieldType(property) {
			return this.fieldTypes.includes(property)
		},

		/**
		 * Return whether a field property represents an html attribute
		 *
		 * @param {string} property
		 * @return {boolean}
		 */
		isHtmlAttribute(property) {
			return property.includes(":")
		},

		/**
		 * Return whether a field property represents the options of a select field
		 *
		 * @param {string} property
		 * @return {boolean}
		 */
		isSelectOptions(prop) {
			return prop.startsWith("options:")
		},

		/**
		 * Return whether a field string is an actual alias
		 *
		 * @param {string} alias
		 * @return {boolean}
		 */
		isAlias(fieldString) {
			return this.fieldAliases.hasOwnProperty(fieldString)
		},

		/**
		 * Set global aliases to be reused accross multiple instances of this class.
		 *
		 * @param {object} aliases
		 * @return {void}
		 */
		setGlobalAliases(aliases) {
			window.FormBuilderAliases = aliases
		}
	},

	props: {
		fields: {
			type: Array,
			required: true
		},

		form: {
			type: Object,
			default: () => {}
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
};

/**
 * Capitalize the given string
 *
 * @param {string} str
 * @return {string}
 */
function capitalize(str) {
	return str.charAt(0).toUpperCase() + str.slice(1)
}
