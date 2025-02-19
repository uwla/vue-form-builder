<template>
    <input
        v-model="checked"
        type="checkbox"
        class="vfb-checkbox"
        @change="handleInput"
    />
</template>
<script lang="ts" src="./VfbCheckbox.ts"></script>
<style src="./VfbCheckbox.css"></style>
