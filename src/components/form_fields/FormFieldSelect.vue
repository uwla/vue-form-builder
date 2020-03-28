<template>
    <select v-bind="html_attributes" @input="$emit('input')">

        <option v-for="(text, value) in options" :key="value" :value="value" >
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
