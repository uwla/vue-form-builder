<template>
    <input
        class="vfb-input"
        type="file"
        :multiple="multiple"
        :class="{ invalid: state === false, valid: state === true }"
        @change="handleInput"
    />
</template>
<script lang="ts" src="./VfbFile.ts"></script>
