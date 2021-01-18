export default class BooleanAttribute {
	static isAttribute(attribute) {
		return this.attributes().includes(attribute);
	}
	static stringAttributeToObject(attribute) {
		return { [attribute]: true };
	}
	static attributes() {
		return [
			"autofocus",
			"multiple",
			"disabled",
			"hidden",
			"required",
			"readonly",
		];
	}
}
