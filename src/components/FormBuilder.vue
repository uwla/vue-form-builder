
<template>
	<form @submit.prevent="$emit('submit')">

		<error-list v-if="errorList"
					v-bind="{ form }" />

		<slot name="start"></slot>

		<form-group
			v-for="(field, i) in formFields" :key="i"
			v-show="(! field.hidden)"
			:cssClass="fieldGroupClass"
			>

			<form-label :field="field" />

			<component :is="field.component"
					   :field="field"
	 				   :class="{'is-invalid': fieldHasError(field.name)}"
					   @input="updateField(field)" />

			<inline-error
				v-if="inlineErrors"
				v-bind="{ form, field: field.name}" />
		</form-group>

		<slot></slot>

		<form-buttons
			v-if="enableButtons"
			v-bind="formButtons" />

		<slot name="end"></slot>
	</form>
</template>

<script src="./FormBuilder.js"></script>
