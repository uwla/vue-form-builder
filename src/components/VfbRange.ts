import { defineComponent } from "vue"

export default defineComponent({
    props: ["modelValue", "state"],
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
