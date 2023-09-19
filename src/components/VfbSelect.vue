<template>
    <select v-model="selected"
        class="vfb-select"
        :class="{'invalid': state === false, 'valid': state === true}">
        <option v-for="(option,i) in options" :key="i" :value="option.value">
            {{ option.text }}
        </option>
    </select>
</template>
<script lang="ts" src="./VfbSelect.ts"></script>
<style src="./VfbSelect.css"></style>