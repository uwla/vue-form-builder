<template>
	<ul class="form-field-options-list">
		<li v-for="(text, value, i) in options" :key="i">
			<input
				v-bind="attributes"
				:value="value"
				:id="cssId + '-' + i"
				:checked="checked(value)"
				@input="$emit('input')"
			/>
			<label :for="cssId + '-' + i">
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
		checked(value) {
			return Array.isArray(this.field.value)
				? this.field.value.includes(value)
				: value === this.field.value;
		}
	}
};
</script>
<style src="./FormFieldCheckbox.scss" lang="scss"></style>
