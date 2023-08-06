<template>
    <input v-model="val"
        class="vfb-input"
        :class="{'invalid': state === false, 'valid': state === true}"
        :aria-invalid="{'true': state === false, 'valid': state === true}">
</template>
<script src="./VfbInput.js"></script>
<style src="./VfbInput.css"></style>