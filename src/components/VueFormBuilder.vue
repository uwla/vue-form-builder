<template>
    <form @submit.prevent="submitForm()" @reset.prevent="resetForm()">
        <component :is="field.wrapperComponent"
            v-bind="field.wrapperComponentProps"
            v-for="(field,i) in fieldsParsed"
            :key="i">
            <component :is="field.component"
                v-bind="field.componentProps"
                v-model="field.value" />
        </component>
    </form>
</template>
<script src="./VueFormBuilder.js"></script>