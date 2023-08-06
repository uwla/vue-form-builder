<template>
    <select v-model="selected"
        class="vfb-select"
        :class="{'invalid': state === false, 'valid': state === true}">
        <option v-for="(option,i) in options" :key="i" :value="option.value">
            {{ option.text }}
        </option>
    </select>
</template>
<script src="./VfbSelect.js"></script>
<style src="./VfbSelect.css"></style>