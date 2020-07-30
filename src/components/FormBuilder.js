//
// ─── LOAD DEPENDENCIES ──────────────────────────────────────────────────────────
//

import FieldParser from '../parser'
import { isArray, isFunction } from '../helpers'

/**
 * The following block of code is used to automatically import our
 * Vue components. It will recursively scan this directory for the
 * components and register them with the file basename.
 */
const files = require.context('./', true, /\.vue$/i);
const components = {};

files.keys().forEach(key => {
    const componentName = key.split('/').pop().split('.')[0];

	if (componentName === "FormBuilder")
		return;

	const component = files(key).default;
	components[componentName] = component;
});

//
// ─── FORM BUILDER ───────────────────────────────────────────────────────────────
//

export default {
    name: "FormBuilder",

    components,

    computed: {
        formFields() {
			const fields = FieldParser.parseFields(this.fields);

			fields.forEach(field => {
				if (this.form[field.name])
					field.value = this.form[field.name]
			});

			return fields;
        },
    },

    methods: {
        /**
         * Update the field value in the form object
         * @param {Object} field
         * @return {void}
         */
        updateField(field) {
			const target = window.event.target,
				   value = target.value;

            if (isArray(this.form[field.name]))
                this.updateFieldOptions(field, value)
            else if (field.type === "file")
                this.form[field.name] = target.files[0]
            else
                this.form[field.name] = value
        },

        /**
         * Update the field options in the form object
         * @param {Object}
         * @return {void}
         */
        updateFieldOptions(field, value) {
            let index = this.form[field.name].indexOf(value)

            if (index === -1)
                this.form[field.name].push(value);
            else
                this.form[field.name].splice(index, 1)
        },

        /**
         * Whether the request has error for the given field
         * @param {String} field
         * @return {Boolean}
         */
        fieldHasError(field) {
            if (isFunction(this.form.requestFieldHasError))
                return this.form.requestFieldHasError(field)
            return false
        }
    },

    props: {
        fields: {
            type: Array,
            required: true
        },
        form: {
            type: Object,
            default: () => ({})
        },
        enableButtons: {
            type: Boolean,
            default: true,
        },
        formButtons: {
            type: Object,
            default: () => ({})
        },
        inlineErrors: {
            type: Boolean,
            default: true,
        },
        errorList: {
            type: Boolean,
            default: false,
        }
	},
}
