
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
        FormButtons, FormGroup, FormLabel, FormFieldInput, FormFieldSelect, FormFieldTextarea, FormFieldRadio, FormFieldCheckbox
    },

    computed: {
        formFields () {
            return this.fields.map(field => {
                field = {class: "form-control", ...this.getFieldObject(field)}
                field = this.assignFieldDefaults(field)

                return {...field};
            });
        }
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
        };
    },

    methods: {

        updateFormField (field) {
            let value = window.event.target.value;

            if (Array.isArray(this.form[field.name])) {
                console.log(value)

                let index = this.form[field.name].indexOf(value)

                if (index === -1)
                    this.form[field.name].push(value);
                else
                    this.form[field.name].splice(index, 1)

                return
            }

            this.form[field.name] = value;
        },

        assignFieldDefaults (field) {

            // field element
            if (!field.element) {
                if (field.type)
                    field.element = "input"
                else if (field.options)
                    field.element = "select"
            }

            // field component
            if (field.options && ["checkbox", "radio"].includes(field.type))
                field.component = "FormField" + capitalize(field.type)
            else
                field.component = "FormField" + capitalize(field.element)

            // field value
            if (this.form[field.name])
                field.value = this.form[field.name]

            return field
        },

        getFieldObject (field) {
            if (typeof field == "string")
                field = this.parseStringToFieldObject(field)

            return field
        },

        parseStringToFieldObject (stringOptions) {
            let options = stringOptions.split("|")

            return options.reduce((field, option) => {
                return {...field, ...this.parseFieldOptionToObject(option)}
            }, {});
        },

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

        getOptionType (option) {
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

        getBooleanAttributeObject (attribute) {
            return {[attribute]: true}
        },

        getHtmlAttributeObject (attribute) {
            let key = attribute.split(":")[0],
                value = attribute.split(":")[1]

            return {[key]: value}
        },

        getSelectOptionsObject (options) {
            // options must be in the format 'options:OBJECT'
            // where OBJECT is a object in JSON

            // so we remove 'options:' from the prop,
            // to get the OBJECT as string
            options = JSON.parse(options.slice(8))
            return {options}
        },

        getElementTypeObject (element) {
            return {element}
        },

        getFieldTypeObject (type) {
            return {type}
        },

        isBooleanAttribute (prop) {
            return this.booleanAttributes.includes(prop)
        },

        isElementType (prop) {
            return this.elements.includes(prop)
        },

        isFieldType (prop) {
            return this.fieldTypes.includes(prop)
        },

        isHtmlAttribute (prop) {
            return prop.includes(":")
        },

        isSelectOptions (prop) {
            return prop.startsWith("options:")
        },
    },

    props: {
        fields: {
            type: Array,
            required: true
        },
        form: Object,

        enableButtons: {
            type: Boolean,
            default: true,
        },

        formButtons: {
            type: Object,
            default: () => ({})
        }
    },
};

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
}
