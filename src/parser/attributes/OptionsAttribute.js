export default class OptionsAttribute {
	static isAttribute(attribute) {
		return attribute.startsWith("options:");
	}
	static stringAttributeToObject(attribute) {
		// The options variable has the format 'options:OBJECT',
		// where OBJECT is a JSON object.

		// So, we remove the substring 'options:' to parse the
		// JSON object.
		const options = JSON.parse(attribute.slice(8));
		return { options };
	}
}
