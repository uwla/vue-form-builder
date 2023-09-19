<template>
    <span class="vfb-feedback-invalid" :class="{ 'visible': state === false }">
        <slot></slot>
    </span>
</template>
<script lang="ts" src="./VfbFeedbackInvalid.ts"></script>
<style src="./VfbFeedbackInvalid.css"></style>