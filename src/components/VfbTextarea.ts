import { defineComponent } from "vue"

export default defineComponent({
    name: "VfbTextarea",
    props: {
        modelValue: { type: String },
        state: { type: Boolean, default: undefined },
    },
    emits: ["update:modelValue"],
    computed: {
        text: {
            get() {
                return this.modelValue
            },
            set(val: any) {
                this.$emit("update:modelValue", val)
            },
        },
    },
})
