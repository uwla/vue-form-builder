<template>
    <ul class="vfb-checkboxes">
        <li v-for="(option,i) in options" :key="i">
            <input type="checkbox" :name="name" :value="option.value"
                v-model="checked" @change="handleInput">
            <span>{{ option.text }}</span>
        </li>
    </ul>
</template>
<script src="./VfbCheckboxes.js"></script>
<style src="./VfbCheckboxes.css"></style>