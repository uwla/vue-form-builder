<template>
    <div :class="cssClass">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: "FormGroup",
    props: {
        cssClass: {
            type: String,
            required: true
        }
    }
}
</script>
