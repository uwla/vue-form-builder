import {capitalize} from './helpers'
import aliases from './fieldAliases'

export default {
    get aliases() {
        if (window.formBuilderAliases)
            return {...aliases, ...window.formBuilderAliases}
        return aliases;
    },

    /**
     * The Html Boolean Attributes
     *
     * @var array
     */
    booleanAttributes: [
        "autofocus", "multiple", "disabled", "hidden", "required", "readonly"
    ],

    /**
     * The html field elements
     *
     * @var array
     */
    elements: [
        "input", "textarea", "select",
    ],

    /**
     * The values of the input type attribute
     *
     * @var array
     */
    inputTypes: [
        "text", "number", "date", "datetime-local", "month", "file", "color", "password", "radio", "range", "url", "email", "checkbox", "range", "tel", "time", "week"
    ],

    /**
     * The attribute types of a field
     *
     * @var array
     */
    attributeTypes: [
        "BooleanAttribute", "Element", "HtmlAttribute", "InputType", "SelectOptions"
    ],

    /**
     * Assign defaults to the field object
     *
     * @param {object} field
     * @return {void}
     */
    assignDefaults(field) {
        this.assignDefaultCssClass(field)
        this.assignDefaultHtmlElement(field)
        this.assignVueComponent(field)
    },

    /**
     * Assign the default css class to the given field
     *
     * @param {object} field
     * @return {void}
     */
    assignDefaultCssClass(field) {
        if (!field.class)
            field.class = "form-control"
    },

    /**
     * Assign the default html element to the given field
     *
     * @param {object} field
     * @return {void}
     */
    assignDefaultHtmlElement(field) {
        if (field.element)
            return

        if (field.type)
            field.element = "input"
        else if (field.options)
            field.element = "select"
        else
            field.element = "textarea"
    },

    assignVueComponent(field) {
        if (field.options && ["checkbox", "radio"].includes(field.type))
            field.component = "FormField" + capitalize(field.type)
        else
            field.component = "FormField" + capitalize(field.element)
    },

    /**
     * Get a field object from a field string or a field object.
     *
     * @param {object|string} field
     * @return {object} field
     */
    getFieldObject(field) {
        if (typeof field === "string")
            field = this.parseStringToFieldObject(field)

        this.assignDefaults(field)

        return {...field}
    },

    /**
     * Parse string to a field object
     *
     * @param {string} str
     * @return {object} field
     */
    parseStringToFieldObject(str) {
        let attributes = this.isAlias(str) ? this.aliases[str] : str

        return attributes.split("|").reduce((field, attribute) =>{
            return {
                ...field,
                ...this.parseAttributeToObject(attribute)
            }
        }, {});
    },

    /**
     * Parse a field attribute to a field option object
     *
     * @param {string} fieldAttribute
     * @return {object} fieldAttribute
     */
    parseAttributeToObject(fieldAttribute) {
        let optionType = this.getOptionType(fieldAttribute)
        return this["get" + optionType + "Object"](fieldAttribute)
    },

    /**
     * Get the option type of a field option string
     *
     * @param {string} option
     * @return {string} optionType
     */
    getOptionType(option) {
        for (let type of this.attributeTypes) {
            if (this["is" + type](option))
                return type
        }
        console.error("The field attributes were not passed correctly.")
    },

    /**
     * Get an object of a html boolean attribute from an atribite string
     *
     * @param {string} attribute
     * @return {object} attribute
     */
    getBooleanAttributeObject(attribute) {
        return {[attribute]: true}
    },

    /**
     * Get an object of a html attribute from an atribite string
     *
     * @param {string} attribute
     * @return {object} attribute
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
     * @return {object} options
     */
    getSelectOptionsObject(options) {
        // the options variable has the format 'options:OBJECT',
        // where OBJECT is a JSON object. So, we remove the
        // substring 'options:' to parse the object
        options = JSON.parse(options.slice(8))
        return {options}
    },

    /**
     * Get the html element of a field
     *
     * @param {string} element
     * @return {object} element
     */
    getElementObject(element) {
        return {element}
    },

    /**
     * Get the object of a html type attribute of an input field
     *
     * @param {string} type
     * @return {object} type
     */
    getInputTypeObject(type) {
        return {type}
    },

    /**
     * Return whether a field string is an alias
     *
     * @param {string} alias
     * @return {boolean}
     */
    isAlias(fieldString) {
        return this.aliases.hasOwnProperty(fieldString)
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
    isElement(property) {
        return this.elements.includes(property)
    },

    /**
     * Return whether a field property represents a html type attribute of an input element
     *
     * @param {string} property
     * @return {boolean}
     */
    isInputType(property) {
        return this.inputTypes.includes(property)
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
};
