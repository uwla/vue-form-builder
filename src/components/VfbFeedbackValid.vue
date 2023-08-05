<template>
    <span class="vfb-feedback-valid" :class="{ 'visible': state === true }">
        <slot></slot>
    </span>
</template>
<script src="./VfbFeedbackValid.js"></script>
<style src="./VfbFeedbackValid.css"></style>