import { defineComponent } from "vue"

export default defineComponent({
    name: "VfbRange",
    props: { modelValue: Number, state: { type: Boolean, default: undefined } },
    emits: ["update:modelValue"],
    computed: {
        val: {
            get() {
                return this.modelValue
            },
            set(value: any) {
                this.$emit("update:modelValue", value)
            },
        },
    },
})
