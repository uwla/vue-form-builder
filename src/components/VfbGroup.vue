<template>
    <div class="vfb-group">
        <label :for="labelFor" v-if="label">
            {{ label }}
        </label>
        <slot></slot>
    </div>
</template>
<script lang="ts" src="./VfbGroup.ts"></script>
<style src="./VfbGroup.css"></style>