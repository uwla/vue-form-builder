<template>
    <ul class="vfb-checkboxes">
        <li v-for="(option,i) in options" :key="i">
            <input type="checkbox" :value="option.value">
            <span>{{ option.text }}</span>
        </li>
    </ul>
</template>
<script src="./VfbCheckboxes.js"></script>
<style src="./VfbCheckboxes.css"></style>