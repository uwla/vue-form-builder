<template>
    <input v-model="val"
        class="vfb-input"
        :class="{ 'is-invalid': state === false }"
        :aria-invalid="{ 'true': state === false }" >
</template>
<script src="./VfbInput.js"></script>
<style src="./VfbInput.css"></style>