<template>
    <textarea v-bind="html_attributes"></textarea>
</template>

<script>
import FormField from './FormFieldElement'
export default {
    name: "FormFieldTextarea",
    mixins: [FormField]
}
</script>
