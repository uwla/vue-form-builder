import { defineComponent } from "vue"

export default defineComponent({
    name: "VfbSelect",
    props: ["options", "modelValue", "state"],
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
