import { defineComponent } from "vue"

export default defineComponent({
    props: ["modelValue", "options", "name", "id", "state"],
    data() {
        return { checked: this.modelValue }
    },
    methods: {
        handleInput() {
            this.$emit("update:modelValue", this.checked)
        },
    },
})
