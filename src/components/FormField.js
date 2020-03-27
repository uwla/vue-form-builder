import FormGroup from './FormGroup.vue'
import FormLabel from './FormLabel.vue'

import FormFieldInput from './form_fields/FormFieldInput.vue'
import FormFieldTextarea from './form_fields/FormFieldTextarea.vue'
import FormFieldCheckbox from './form_fields/FormFieldCheckbox.vue'
import FormFieldRadio from './form_fields/FormFieldRadio.vue'
import FormFieldSelect from './form_fields/FormFieldSelect.vue'

export default {
    name: "FormField",

    components: {
        FormGroup, FormLabel,
        FormFieldInput, FormFieldSelect, FormFieldTextarea,
        FormFieldRadio, FormFieldCheckbox
    },

    computed: {
        component() {
            let {field} = this

            if (field.options && ["checkbox", "radio"].includes(field.type))
                return "FormField" + capitalize(field.type)
            else
                return"FormField" + capitalize(this.fieldElement)
        },

        fieldElement() {
            let {field} = this

            if (field.element)
                return field.element
            if (field.type)
                return "input"
            if (field.options)
                return "select"
        }
    },

    props: {
        field: {
            type: Object,
            required: true
        }
    }
}

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
}
