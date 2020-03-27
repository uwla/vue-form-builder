<template>
    <input v-bind="html_attributes">
</template>

<script>
import FormField from './FormFieldElement'
export default {
    name: "FormFieldInput",
    mixins: [FormField]
}
</script>

<style lang="css">
input[type="color"] {
    height: calc(2.25rem + 2px);
    border: 1px solid rgb(169, 169, 169);
    padding: 1px 2px;
}

input[type="file"] {
    height: auto;
    max-height: auto;
}
</style>
