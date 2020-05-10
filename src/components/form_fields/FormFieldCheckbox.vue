<template>
    <ul class="form-field-options-list">
        <li v-for="(text, value) in options" :key="value">
            <input  @input="$emit('input')"
                    v-bind="{
                        ...htmlAttributes,
                        id: css_id + value,
						checked: Array.isArray(field.value) ?
								field.value.includes(value) : (value == field.value),
                        value}" />
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
