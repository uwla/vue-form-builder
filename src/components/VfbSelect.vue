<template>
    <select class="vfb-select" v-model="selected">
        <option v-for="(option,i) in options" :key="i" :value="option.value">
            {{ option.text }}
        </option>
    </select>
</template>
<script src="./VfbSelect.js"></script>
<style src="./VfbSelect.css"></style>