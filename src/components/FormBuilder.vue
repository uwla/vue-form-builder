
<template>
    <form @submit.prevent="$emit('submit')">
        <slot name="start"></slot>

        <form-group v-for="(field, i) in formFields" v-show="(!field.hidden)" :key="i">
            <form-label :field="field">
            </form-label>

            <component :is="field.component"
                       :field="field"
                       :class="{'is-invalid': form.errors.has(field.name)}"
                       @input="updateFormField(field)">
            </component>

            <has-error v-bind="{form, field: field.name}">
            </has-error>
        </form-group>

        <slot></slot>

        <form-buttons v-if="enableButtons"
                      v-bind="formButtons">
        </form-buttons>

        <slot name="end"></slot>
    </form>
</template>

<script src="./FormBuilder.js"></script>
