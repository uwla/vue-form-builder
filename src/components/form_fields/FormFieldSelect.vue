<template>
    <select v-bind="html_attributes">
        <option v-for="(text, value) in options" :key="value" :value="value">
            {{ text }}
        </option>
    </select>
</template>

<script>
import FormField from '../FormField'

export default {
    name: "FormFieldSelect",
    mixins: [FormField],
}
</script>
