<template>
    <div class="custom-feedback">
        <span v-if="state === true" class="err">{{ errors }}</span>
        <span v-if="state === false" class="msg">{{ message }}</span>
    </div>
</template>
<script>
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'CustomFeedback',
    props: {
        state: Boolean,
        errors: [String, Array],
        message: String,
        invalidFeedbackComponent: [String, Object],
        validFeedbackComponent: [String, Object],
    }
})
</script>