<template>
    <select v-model="selected">
        <option v-for="(option,i) in options" :key="i" :value="option.value">
            {{ option.text }}
        </option>
    </select>
</template>
<script src="./VfbSelect.js"></script>