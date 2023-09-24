<template>
    <div class="custom-wrapper">
        <label :for="labelFor">{{ label }}</label>
        <slot></slot>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'CustomWrapper',
    props: ['label', 'labelFor', 'a1', 'b2', 'c3']
})
</script>