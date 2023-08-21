<template>
    <div>
        <label :for="labelFor">{{ label }}</label>
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: 'CustomWrapper',
    props: ['label', 'labelFor']
}
</script>
