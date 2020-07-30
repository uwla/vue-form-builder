export default class ElementAttribute {
	static isAttribute(attribute) {
		return this.attributes.includes(attribute);
	}

	static parseStringAttributeToObject(attribute) {
		return { element: attribute };
	}

	static get attributes() {
		return ["input", "textarea", "select"];
	}
}
