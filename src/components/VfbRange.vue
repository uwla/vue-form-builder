<template>
    <span class="vfb-range-val">{{ val }}</span>
    <input v-model="val"
        v-bind="$attrs"
        type="range"
        class="vfb-input"
        :class="{'invalid': state === false, 'valid': state === true}"
        :aria-invalid="state === false" />
</template>
<script lang="ts" src="./VfbRange.ts"></script>
<style src="./VfbRange.css"></style>