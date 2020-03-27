<template>
    <form-group v-show="(!field.hidden)">

        <form-label :field="field"></form-label>
        <component :is="component" :field="field"></component>
    </form-group>
</template>

<script src="./FormField.js"></script>
