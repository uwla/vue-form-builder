import { defineComponent } from "vue"

export default defineComponent({
    props: ["modelValue"],
    data() {
        return { checked: this.modelValue }
    },
    methods: {
        handleInput() {
            this.$emit("update:modelValue", this.checked)
        },
    },
})
