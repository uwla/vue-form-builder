<template>
    <input v-model="val"
        class="vfb-input"
        :class="{'is-invalid': state === false, 'is-valid': state === true}"
        :aria-invalid="{'true': state === false, 'is-valid': state === true}">
</template>
<script src="./VfbInput.js"></script>
<style src="./VfbInput.css"></style>