import { defineComponent } from "vue"

export default defineComponent({
    name: "VfbFeedback",
    props: {
        state: { type: Boolean, default: undefined },
        errors: [String, Array],
        message: String,
        invalidFeedbackComponent: [String, Object],
        validFeedbackComponent: [String, Object],
    },
    computed: {
        showFeedback() {
            return this.state !== null
        },
        errorMessages() {
            if (Array.isArray(this.errors)) return this.errors
            if (typeof this.errors === "string") return [this.errors]
            return []
        },
    },
})
