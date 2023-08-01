<template>
    <ul class="vfb-radios">
        <li v-for="(option,i) in options" :key="i">
            <input class="vfb-radio" type="radio"
                :name="name" :value="option.value"
                v-model="checked" @change="handleInput">
            <span>{{ option.text }}</span>
        </li>
    </ul>
</template>
<script src="./VfbRadio.js"></script>