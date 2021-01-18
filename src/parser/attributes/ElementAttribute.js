export default class ElementAttribute {
	static isAttribute(attribute) {
		return this.attributes().includes(attribute);
	}
	static stringAttributeToObject(attribute) {
		return { element: attribute };
	}
	static attributes() {
		return ["input", "textarea", "select"];
	}
}
