<template>
    <component :is="formComponent" ref="form"
        @submit.prevent="submitForm()" @reset.prevent="resetForm()">
        <component :is="field.componentWrapper"
            v-bind="field.componentPropsWrapper"
            v-for="(field,i) in fieldsParsed" :key="i">
            <component :is="field.component"
                v-bind="field.componentProps"
                v-model="field.value"
                @input="handleInput(field)" />
            <component :is="field.componentFeedback"
                v-bind="feedbacks[field.name]"
                v-if="field.name" />
        </component>
    </component>
</template>
<script src="./VueFormBuilder.js"></script>