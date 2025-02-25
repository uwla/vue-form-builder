import { defineComponent } from "vue"

export default defineComponent({
    name: "VfbButtons",
    props: {
        resetText: { type: String, default: "CANCEL" },
        submitText: { type: String, default: "SAVE" },
        showReset: { type: Boolean, default: true },
        showSubmit: { type: Boolean, default: true },
    },
})
