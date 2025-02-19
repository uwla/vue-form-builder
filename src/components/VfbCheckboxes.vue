<template>
    <ul
        class="vfb-checkboxes"
        :class="{ invalid: state === false, valid: state === true }"
    >
        <li
            v-for="(option, i) in options"
            :key="i"
        >
            <input
                :id="`${id}_${i}`"
                type="checkbox"
                class="vfb-checkbox"
                :name="name"
                :value="option.value"
                :checked="modelValue.includes(option.value)"
                @change="handleInput"
            />
            <label :for="`${id}_${i}`">
                {{ option.text }}
            </label>
        </li>
    </ul>
</template>
<script lang="ts" src="./VfbCheckboxes.ts"></script>
<style src="./VfbCheckboxes.css"></style>
