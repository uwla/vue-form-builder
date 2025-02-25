import { defineComponent } from "vue"

export default defineComponent({
    name: "VfbRadio",
    props: {
        modelValue: [String, Number],
        options: Array,
        name: String,
        id: String,
        state: { type: Boolean, default: undefined },
    },
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
