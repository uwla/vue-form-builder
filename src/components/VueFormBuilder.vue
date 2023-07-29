<template>
    <b-form @submit.prevent="submitForm()">
        <component :is="field.wrapperComponent"
            v-bind="field.wrapperComponentProps"
            v-for="(field,i) in fieldsParsed"
            :key="i">
            <component :is="field.component"
                v-bind="field.componentProps"
                v-model="field.value" />
        </component>
    </b-form>
</template>
<script src="./VueFormBuilder.js"></script>