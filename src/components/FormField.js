export default {
    name: "FormField",

    computed: {
        element() {
            return this.field.element
        },

        options() {
            return this.field.options
        },

        attributes() {
            let attributes = {...this.field}

            attributes.options = undefined
            attributes.element = undefined

            if (attributes.type && attributes.type == 'file')
                attributes.value = undefined;

            attributes.id = attributes.id || attributes.name

            return attributes;
        },
    },

    methods: {
        update(e) {
            this.$emit('update', e.target.value, e.target.name);
        },


    },

    props: {
        field: {
            type: Object,
            required: true
        },
        //form: Object
    },
};
