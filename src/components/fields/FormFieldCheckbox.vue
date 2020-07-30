<template>
    <ul class="form-field-options-list">
        <li v-for="(text, value, index) in options" :key="index">
            <input v-bind="getInputBindings(value)" @input="$emit('input')" />

            <label :for="(css_id + '_' + value)">
                {{ text }}
            </label>
        </li>
    </ul>
</template>

<script>
import FormField from './FormField'

export default {
    name: "FormFieldCheckbox",
	mixins: [FormField],
	methods: {
		getInputBindings(value) {
			let {attributes, css_id, field: {value: fieldValue}} = this;

			return {
				...attributes,
				id: css_id + '-' + value,
				checked: Array.isArray(fieldValue) ? fieldValue.includes(value) : (value == fieldValue),
				value,
			}
		}
	}
}
</script>

<style src="./FormFieldCheckbox.scss" lang="scss" scoped></style>
