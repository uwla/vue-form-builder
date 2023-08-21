<template>
    <div class="custom-wrapper">
        <label :for="labelFor">{{ label }}</label>
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: 'CustomWrapper',
    props: ['label', 'labelFor', 'a1', 'b2', 'c3']
}
</script>