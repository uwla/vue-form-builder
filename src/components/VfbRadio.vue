<template>
    <ul
        class="vfb-radios"
        :class="{ invalid: state === false, valid: state === true }"
    >
        <li
            v-for="(option, i) in options"
            :key="i"
        >
            <input
                :id="`${id}_${i}`"
                v-model="checked"
                class="vfb-radio"
                type="radio"
                :name="name"
                :value="option.value"
                @change="handleInput"
            />
            <label :for="`${id}_${i}`">
                {{ option.text }}
            </label>
        </li>
    </ul>
</template>
<script lang="ts" src="./VfbRadio.ts"></script>
