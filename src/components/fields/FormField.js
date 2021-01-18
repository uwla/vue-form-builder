import { reduceArrayToObject } from "../../helpers";

function isNonHtmlAttribute(fieldKey) {
	return ["options", "element", "component", "label"].includes(fieldKey);
}
export default {
	computed: {
		cssId() {
			return this.field.id || this.field.name;
		},
		attributes() {
			const fieldType = this.field.type;
			const attributes = {
				id: this.cssId
			};
			for (let key in this.field) {
				if (isNonHtmlAttribute(key) || (fieldType === "file" && key === "value")) {
					continue;
				}
				attributes[key] = this.field[key];
			}
			return attributes;
		},
		options() {
			let { options } = this.field;
			if (Array.isArray(options)) {
				return reduceArrayToObject(options);
			} else if (typeof options === "object") {
				return options;
			}
		}
	},
	props: {
		field: {
			type: Object,
			required: true
		}
	}
};
