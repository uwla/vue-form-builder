<template>
    <div class="custom-field">Some custom field</div>
</template>
<script>
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'CustomField',
    props: ['prop1', 'prop2', 'prop3', 'value', 'values', 'model']
})
</script>