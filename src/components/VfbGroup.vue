<template>
    <div class="vfb-group">
        <label :for="labelFor" v-if="label">
            {{ label }}
        </label>
        <slot></slot>
    </div>
</template>
<script src="./VfbGroup.js"></script>
<style src="./VfbGroup.css"></style>