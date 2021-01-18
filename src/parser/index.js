import { capitalize } from "../helpers";
import fieldAliases from "../aliases";
import AttributeClasses from "./attributes";

function assignDefaultHtmlElementToField(field) {
	if (typeof field.element === "string" && field.element !== "") {
		return null;
	}
	if (field.type) {
		field.element = "input";
	} else if (field.options) {
		field.element = "select";
	} else {
		field.element = "textarea";
	}
}

function assignComponentToField(field) {
	if (field.options && ["checkbox", "radio", "select"].includes(field.type)) {
		field.component = "FormField" + capitalize(field.type);
	} else {
		field.component = "FormField" + capitalize(field.element);
	}
}

function assignDefaultsToField(field) {
	assignDefaultHtmlElementToField(field);
	assignComponentToField(field);
}

function stringAttributeToObject(attribute) {
	for (let AttributeClass of AttributeClasses) {
		if (AttributeClass.isAttribute(attribute)) {
			return AttributeClass.stringAttributeToObject(attribute);
		}
	}
}

function stringToFieldObject(str) {
	let attributes = fieldAliases.isAlias(str) ? fieldAliases.getAlias(str) : str;
	let attributeObject, field = {};
	attributes.split("|").forEach((attribute) => {
		attributeObject = stringAttributeToObject(attribute);
		for (let key in attributeObject) {
			field[key] = attributeObject[key];
		}
	});
	return field;
}

function parseField(field) {
	if (typeof field === "string") {
		field = stringToFieldObject(field);
	}
	assignDefaultsToField(field);
	return { ...field };
}

function parseFields(fields) {
	return fields.map(parseField);
}

export { parseFields };
