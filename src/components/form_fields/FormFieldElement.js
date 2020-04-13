export default {
    computed: {
        css_id() {
            return this.field.id || this.field.name
        },

        html_attributes() {
            let attributes = {}

            for (let key in this.field) {
                if (["options", "element", "component", "label"].includes(key))
                    continue
                if (key == "value" && this.field.type == "file")
                    continue
                attributes[key] = this.field[key]
            }

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
