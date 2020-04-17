<template>
    <select @input="$emit('input')"
            v-bind="htmlAttributes">
        <option v-for="(text, value, index) in options"
                :key="index"
                :value="value">
            {{ text }}
        </option>
    </select>
</template>

<script>
import FormField from './FormFieldElement'

export default {
    name: "FormFieldSelect",
    mixins: [FormField],
}
</script>
