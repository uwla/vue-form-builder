<template>
    <ul class="vfb-radio">
        <li v-for="(option,i) in options" :key="i">
            <input type="radio" :name="name" :value="option.value"
                v-model="checked" @change="handleInput">
            <span>{{ option.text }}</span>
        </li>
    </ul>
</template>
<script src="./VfbRadio.js"></script>