<template>
    <div class="vfb-group">
        <label
            v-if="label"
            :for="labelFor"
        >
            {{ label }}
        </label>
        <slot></slot>
    </div>
</template>
<script lang="ts" src="./VfbGroup.ts"></script>
<style src="./VfbGroup.css"></style>
