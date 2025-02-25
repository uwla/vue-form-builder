import { defineComponent } from "vue"

export default defineComponent({
    name: "VfbSelect",
    props: {
        options: Array,
        modelValue: [Array, String, Number],
        state: { type: Boolean, default: undefined },
    },
    emits: ["update:modelValue"],
    computed: {
        selected: {
            get() {
                return this.modelValue
            },
            set(newValue: any) {
                this.$emit("update:modelValue", newValue)
            },
        },
    },
})
