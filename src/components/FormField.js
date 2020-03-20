export default {
    name: "FormField",

    computed: {
        css_id() {
            return this.field.id || this.field.name
        },

        html_attributes() {
            let attributes = {...this.field}

            attributes.options = undefined
            attributes.element = undefined
            attributes.component = undefined

            if (attributes.type && attributes.type == 'file')
                attributes.value = undefined;

            attributes.id = this.css_id

            return attributes;
        },

        options() {
            return this.field.options
        }
    },

    props: {
        field: {
            type: Object,
            required: true
        },
    },
};
