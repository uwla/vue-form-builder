<template>
    <input v-model="val"
        class="vfb-input"
        :class="{'invalid': state === false, 'valid': state === true}"
        :aria-invalid="state === false" />
</template>
<script lang="ts" src="./VfbInput.ts"></script>
<style src="./VfbInput.css"></style>