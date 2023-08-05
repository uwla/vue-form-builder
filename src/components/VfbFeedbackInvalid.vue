<template>
    <span class="vfb-feedback-invalid" :class="{ 'visible': state === false }">
        <slot></slot>
    </span>
</template>
<script src="./VfbFeedbackInvalid.js"></script>
<style src="./VfbFeedbackInvalid.css"></style>