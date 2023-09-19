<template>
    <ul class="vfb-checkboxes"
        :class="{'invalid': state === false, 'valid': state === true}">
        <li v-for="(option,i) in options" :key="i">
            <input class="vfb-checkbox" type="checkbox"
                :name="name" :value="option.value" :id="`${id}_${i}`"
                v-model="checked" @change="handleInput">
            <label :for="`${id}_${i}`">
                {{ option.text }}
            </label>
        </li>
    </ul>
</template>
<script lang="ts" src="./VfbCheckboxes.ts"></script>
<style src="./VfbCheckboxes.css"></style>