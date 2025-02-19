<template>
    <div
        v-if="showFeedback"
        class="vfb-feedback"
    >
        <component
            :is="invalidFeedbackComponent"
            v-bind="{ state }"
            v-if="errors"
        >
            <span
                v-for="(error, i) in errorMessages"
                :key="i"
            >
                {{ error }}
            </span>
        </component>
        <component
            :is="validFeedbackComponent"
            v-bind="{ state }"
            v-if="message"
        >
            {{ message }}
        </component>
    </div>
</template>
<script lang="ts" src="./VfbFeedback.ts"></script>
<style src="./VfbFeedback.css"></style>
