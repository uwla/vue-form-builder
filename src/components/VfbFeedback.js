export default {
    computed: {
        showFeedback() {
            return this.state !== null
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
}