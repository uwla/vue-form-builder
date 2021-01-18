export default class HtmlAttribute {
	static isAttribute(attribute) {
		return attribute.includes(":") && !attribute.startsWith("options:");
	}
	static stringAttributeToObject(attribute) {
		const key = attribute.split(":")[0],
			value = attribute.split(":")[1];
		return { [key]: value };
	}
}
