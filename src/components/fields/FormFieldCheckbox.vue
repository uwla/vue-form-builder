<template>
	<ul class="form-field-options-list">
		<li v-for="(text, value, i) in options" :key="i">
			<input v-bind="getInputBindings(value)" @input="$emit('input')" />
			<label :for="cssId + '-' + value">
				{{ text }}
			</label>
		</li>
	</ul>
</template>
<script>
import FormField from "./FormField";
export default {
	name: "FormFieldCheckbox",
	mixins: [FormField],
	methods: {
		getInputBindings(value) {
			let fieldValue = this.field.value;
			return {
				...this.attributes,
				value,
				id: this.cssId + "-" + value,
				checked: Array.isArray(fieldValue)
					? fieldValue.includes(value)
					: value === fieldValue,
			};
		},
	},
};
</script>
<style src="./FormFieldCheckbox.scss" lang="scss"></style>
