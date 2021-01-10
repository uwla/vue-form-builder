export default class BooleanAttribute {
	static isAttribute(attribute) {
		return this.attributes.includes(attribute);
	}

	static parseStringAttributeToObject(attribute) {
		return { [attribute]: true };
	}

	static get attributes() {
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
