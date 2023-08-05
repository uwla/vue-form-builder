<template>
    <select v-model="selected"
        class="vfb-select"
        :class="{'is-invalid': state === false, 'is-valid': state === false}">
        <option v-for="(option,i) in options" :key="i" :value="option.value">
            {{ option.text }}
        </option>
    </select>
</template>
<script src="./VfbSelect.js"></script>
<style src="./VfbSelect.css"></style>