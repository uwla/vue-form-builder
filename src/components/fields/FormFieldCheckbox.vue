<template>
    <ul class="form-field-options-list">
        <li v-for="(text, value, i) in options" :key="i">
            <input v-bind="getInputBindings(value)" @input="$emit('input')" />

            <label :for="(cssId + '-' + value)">
                {{ text }}
            </label>
        </li>
    </ul>
</template>

<script>
import FormField from './FormField'
import { isArray } from '../../helpers';

export default {
    name: "FormFieldCheckbox",
	mixins: [FormField],
	methods: {
		getInputBindings(value) {
			let {attributes, cssId, field: {value: fieldValue}} = this;

			return {
				...attributes,
				value,
				id: cssId + '-' + value,
				checked: isArray(fieldValue) ? fieldValue.includes(value) : (value == fieldValue),
			}
		}
	}
}
</script>

<style src="./FormFieldCheckbox.scss" lang="scss" scoped></style>
