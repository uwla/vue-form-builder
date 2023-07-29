export default {
    props: {
        resetText: {
            type: String,
            default: "CANCEL"
        },
        submitText: {
            type: String,
            default: "SAVE",
        },
        showReset: {
            type: Boolean,
            default: true,
        },
        showSubmit: {
            type: Boolean,
            default: true,
        },
    },
}