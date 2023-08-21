<template>
    <input class="custom-field" v-model="value">
</template>
<script>
export default {
    name: 'CustomField',
    props: ['prop1', 'prop2', 'prop3', 'value']
}
</script>