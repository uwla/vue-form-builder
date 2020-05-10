import {is_array, reduceArrayToObject} from '../../helpers'

export default {
    computed: {
        css_id() {
            return this.field.id || this.field.name
        },

        attributes() {
            let attributes = {id: this.css_id}

            for (let key in this.field) {
				if 	(this.isNonHtmlAttribute(key) ||
					(key === "value" && this.field.type === "file"))
                    continue
                attributes[key] = this.field[key]
            }

            return attributes;
        },

        options() {
			let {options} = this.field
			if (is_array(options))
				return reduceArrayToObject(options)
			return options
        }
    },

    data() {
        return {
            nonHtmlAttributes: ["options", "element", "component", "label"]
        }
    },

    methods: {
        /**
         *  Whether a field property is not a html attribute
         *
         * @param {string} property
         * @return {boolean}
         */
        isNonHtmlAttribute(fieldKey) {
            return this.nonHtmlAttributes.includes(fieldKey)
        },
    },

    props: {
        field: {
            type: Object,
            required: true
        },
    },
};
