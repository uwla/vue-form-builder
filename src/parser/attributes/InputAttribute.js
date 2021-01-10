export default class InputAttribute {
	static isAttribute(attribute) {
		return this.attributes.includes(attribute);
	}

	static parseStringAttributeToObject(attribute) {
		return { type: attribute };
	}

	static get attributes() {
		return ["text", "number", "date", "datetime-local", "month", "file", "color", "password", "radio", "range", "url", "email", "checkbox", "range", "tel", "time", "week"];
	}
}
