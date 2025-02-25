import { defineComponent } from "vue"

export default defineComponent({
    name: "VfbCheckbox",
    props: { modelValue: { type: Boolean, default: undefined } },
    emits: ["update:modelValue"],
    data() {
        return { checked: this.modelValue }
    },
    methods: {
        handleInput() {
            this.$emit("update:modelValue", this.checked)
        },
    },
})
