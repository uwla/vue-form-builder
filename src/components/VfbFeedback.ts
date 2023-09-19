import { defineComponent } from "vue"

export default defineComponent({
    computed: {
        showFeedback() {
            return this.state !== null
        },
        errorMessages() {
            if (Array.isArray(this.errors))
                return this.errors
            if (typeof this.errors === 'string')
                return [this.errors]
            return []
        }
    },
    props: {
        state: {
            default: null,
            type: Boolean,
        },
        errors: [String, Array],
        message: String,
        invalidFeedbackComponent: [String, Object],
        validFeedbackComponent: [String, Object],
    }
})