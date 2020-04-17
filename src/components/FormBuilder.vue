
<template>
    <form @submit.prevent="$emit('submit')">
        <slot name="start"></slot>

        <form-group v-for="(field, index) in formFields"
                    v-show="(!field.hidden)"
                    :key="index">

            <form-label :field="field" />

            <component :is="field.component"
                       :field="field"
                       :class="{'is-invalid': form.errors.has(field.name)}"
                       @input="updateFormField(field)" />

            <has-error v-bind="{form, field: field.name}" />
        </form-group>

        <slot></slot>

        <form-buttons v-if="enableButtons"
                      v-bind="formButtons" />

        <slot name="end"></slot>
    </form>
</template>

<script src="./FormBuilder.js"></script>
