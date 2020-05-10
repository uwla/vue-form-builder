<template>
    <textarea v-bind="attributes" @input="$emit('input')"></textarea>
</template>

<script>
import FormField from './FormField'
export default {
    name: "FormFieldTextarea",
    mixins: [FormField],
}
</script>
