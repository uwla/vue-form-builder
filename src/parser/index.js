import { capitalize, isString, stringNotEmpty } from "../helpers";
import FieldAliases from "../aliases";
import AttributeTypes from './attributes'

// ────────────────────────────────────────────────────────────────────────────────

/**
 * Assign defaults to the field object
 *
 * @param {Object}
 * @returns {void}
 */
function assignFieldDefaults(field) {
	assignFieldDefaultHtmlElement(field);
	assignFieldVueComponent(field);
}

/**
 * Assign the default html element to the given field
 *
 * @param {Object}
 * @returns {void}
 */
function assignFieldDefaultHtmlElement(field) {
	if (stringNotEmpty(field.element))
		return;

	if (field.type)
		field.element = "input";
	else if (field.options)
		field.element = "select";
	else
		field.element = "textarea";
}

/**
 * Assign the matching Vue component to the given field
 *
 * @param {Object}
 * @returns {void}
 */
function assignFieldVueComponent(field) {
	if (field.options && ["checkbox", "radio", "select"].includes(field.type))
		field.component = "FormField" + capitalize(field.type);
	else
		field.component = "FormField" + capitalize(field.element);
}

/**
 * Get the class of the given attribute
 *
 * @param {String}
 * @return {String}
 */
function getFieldAttributeClass(attribute) {
	for (let attributeType of AttributeTypes) {
		if (attributeType.isAttribute(attribute))
			return attributeType;
	}
}

/**
 * Get all field aliases
 *
 * @param {String} alias
 * @returns {Object}
 */
function getFieldAliases() {
	return FieldAliases.getAliases();
}

/**
 * Get the a field string from a field alias
 *
 * @param {String} alias
 * @returns {String}
 */
function getFieldStringFromAlias(alias) {
	return getFieldAliases()[alias];
}

/**
 * Indicates whether a string is a field alias
 *
 * @param {String}
 * @returns {Boolean}
 */
function isFieldAlias(str) {
	return getFieldAliases().hasOwnProperty(str);
}

/**
 * Parse string to a field object
 *
 * @param {String}
 * @return {Object}
 */
function parseStringToFieldObject(str) {
	let attributes = isFieldAlias(str) ? getFieldStringFromAlias(str) : str;

	let field = {};

	attributes.split("|").forEach(attribute => {
		field = {... field, ... parseStringAttributeToObject(attribute)}
	});

	return field;
}

/**
 * Parse a field attribute to a field option object
 *
 * @param {String}
 * @return {Object}
 */
function parseStringAttributeToObject(attribute) {
	const AttributeType = getFieldAttributeClass(attribute);
	return AttributeType.parseStringAttributeToObject(attribute);
}

/**
 * Parse a string or object to a field object.
 *
 * @param {Object|String}
 * @return {Object}
 */
function parseField(field) {
	if (isString(field))
		field = parseStringToFieldObject(field);

	assignFieldDefaults(field);

	return { ... field };
}

/**
 * Parse the given fields to the proper format.
 *
 * @param {Array}
 * @returns {Array}
 */
function parseFields(fields) {
	return fields.map(parseField);
}

export {
	parseFields
};
