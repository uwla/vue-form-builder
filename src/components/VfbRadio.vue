<template>
    <ul class="vfb-radios"
        :class="{'invalid': state === false, 'valid': state === true}">
        <li v-for="(option,i) in options" :key="i">
            <input class="vfb-radio" type="radio"
                :name="name" :value="option.value" :id="`${id}_${i}`"
                v-model="checked" @change="handleInput">
            <label :for="`${id}_${i}`">
                {{ option.text }}
            </label>
        </li>
    </ul>
</template>
<script src="./VfbRadio.js"></script>