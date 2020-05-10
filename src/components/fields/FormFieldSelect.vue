<template>
    <select v-bind="attributes" @input="$emit('input')">
        <option v-for="(text, value, index) in options"
                :key="index"
                :value="value">
            {{ text }}
        </option>
    </select>
</template>

<script>
import FormField from './FormField'

export default {
    name: "FormFieldSelect",
    mixins: [FormField],
}
</script>
