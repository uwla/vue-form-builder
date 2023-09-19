<template>
    <span class="vfb-feedback-valid" :class="{ 'visible': state === true }">
        <slot></slot>
    </span>
</template>
<script lang="ts" src="./VfbFeedbackValid.ts"></script>
<style src="./VfbFeedbackValid.css"></style>