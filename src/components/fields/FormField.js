import { isArray, reduceArrayToObject, isObject } from '../../helpers'

export default {
    computed: {
        cssId() {
            return this.field.id || this.field.name
        },

        attributes() {
			const fieldType = this.field.type;
			const attributes = {
				id: this.cssId
			};

            for (let key in this.field) {
				if 	(isNonHtmlAttribute(key) ||
					(fieldType === "file" && key === "value")) {
					continue
				}

                attributes[key] = this.field[key]
            }

            return attributes;
        },

        options() {
			let { options } = this.field;

			if (isArray(options))
				return reduceArrayToObject(options)
			else if (isObject(options))
				return options
        }
    },

    props: {
        field: {
            type: Object,
            required: true
        },
    },
};

function isNonHtmlAttribute(fieldKey) {
	const nonHtmlAttributes = ["options", "element", "component", "label"];
	return nonHtmlAttributes.includes(fieldKey);
}
