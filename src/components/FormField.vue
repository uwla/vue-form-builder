<template>
    <input v-if="(element == 'input')" v-bind="attributes" @input="update"/>

    <textarea v-else-if="(element == 'textarea')" v-bind="attributes" @input="update"></textarea>

    <select v-else-if="(element == 'select')" v-bind="attributes">
        <option v-for="(option, key) in options" :key="key" :value="key">
            {{ option }}
        </option>
    </select>
</template>

<script src="./FormField.js"></script>

<style lang="css">
input[type="color"] {
    height: 23px !important;
    border: 1px solid rgb(169, 169, 169);
    padding: 1px 2px;
}
</style>
