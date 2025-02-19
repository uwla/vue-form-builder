import { defineComponent } from "vue"

export default defineComponent({
    props: ["modelValue", "state"],
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
