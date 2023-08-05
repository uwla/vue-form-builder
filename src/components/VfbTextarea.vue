<template>
    <textarea v-model="text"
        class="vfb-textarea"
        :class="{ 'is-invalid': state === false }"
        :aria-invalid="{ 'true': state === false }" />
</template>
<script src="./VfbTextarea.js"></script>