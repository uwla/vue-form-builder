<template>
    <ul>
        <li v-for="(text, value) in options" :key="value">
            <input v-bind="{...html_attributes, id: css_id + value, value}" @input="$emit('input')">

            <label :for="(css_id + value)">
                {{ text }}
            </label>
        </li>
    </ul>
</template>

<script>
import FormField from './FormFieldElement'

export default {
    name: "FormFieldCheckbox",
    mixins: [FormField],
}
</script>

<style lang="scss" scoped src="./FormFieldCheckbox.scss"></style>
