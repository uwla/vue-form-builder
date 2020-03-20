<template>
    <textarea v-bind="html_attributes"></textarea>
</template>

<script>
import FormField from '../FormField'
export default {
    name: "FormFieldTextarea",
    mixins: [FormField]
}
</script>
