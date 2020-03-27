
<template>
    <form @submit.prevent="$emit('submit')">
        <form-field v-for="(field, i) in formFields" :field="field" :key="i"></form-field>
        <slot></slot>
    </form>
</template>

<script src="./FormBuilder.js"></script>
