<template>
    <select v-bind="attributes" @input="$emit('input')" v-model="field.value">
        <option
			v-for="(text, value, i) in options" :key="i"
			:value="value">
            {{ text }}
        </option>
    </select>
</template>

<script>
import FormField from './FormField'
import { isArray } from '../../helpers';

export default {
    name: "FormFieldSelect",
	mixins: [FormField],
	methods: {
	}
}
</script>
