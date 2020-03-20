import FormField from './FormField.vue';
//import FormButtons from './FormButtons.vue';

export default {
    name: "FormBuilder",

    components: {
        FormField, //FormButtons
    },

    computed: {
        formFields () {
            return this.fields.map(field => {
                field = {class: "form-control", ...this.getFieldObject(field)}
                field = this.assignMissingFieldAttributes(field)

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
                'input', 'textarea', 'select'
            ],
            fieldTypes: [
                'text', 'number', 'date', 'datetime-local', 'month', 'file', 'color', 'password', 'radio', 'range', 'url', 'email', 'checkbox', 'range', 'tel', 'time', 'week'
            ],
        };
    },

    methods: {
        updateForm (value, fieldName) {
            this.form[fieldName] = value;
            this.$emit('update');
        },

        assignMissingFieldAttributes (field) {
            // only an input field has the type attribute
            if (field.type)
                field.element = "input"

            // only a select field has options
            if (field.options)
                field.element = "select"

            // assign a value if some
            if (this.form[field.name])
                field.value = this.form[field.name]

            // assign error
            if (this.form.errors.hasOwnProperty(field.name))
                field.class += " is-invalid";

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

        toTitleCase(string) {
            return string.charAt(0).toUpperCase() +
                string.slice(1).replace(/[-_]/g, " ").replace(/([a-z])([A-Z])/g, "$1 $2")
        }
    },

    props: {
        fields: {
            type: Array,
            required: true
        },
        form: Object,
    },
};
