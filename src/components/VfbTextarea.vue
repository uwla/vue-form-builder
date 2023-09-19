<template>
    <textarea v-model="text"
        class="vfb-textarea"
        :class="{ 'invalid': state === false }"
        :aria-invalid="state === false" />
</template>
<script lang="ts" src="./VfbTextarea.ts"></script>