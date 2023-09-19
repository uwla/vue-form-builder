<template>
    <component :is="formComponent" ref="form" @submit="submitForm" @reset="resetForm">
        <component :is="field.componentWrapper"
            v-bind="field.propsWrapper"
            v-for="(field,i) in fieldsParsed" :key="i">
            <component :is="field.component"
                v-bind="field.props"
                v-model="field.value"
                @model:updateValue="handleInput(field)" />
            <component :is="field.componentFeedback"
                v-bind="feedbacks[field.name]"
                v-if="field.name" />
        </component>
    </component>
</template>
<script lang="ts" src="./VueFormBuilder.ts"></script>