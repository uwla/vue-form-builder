import { defineComponent } from "vue"

export default defineComponent({
    name: "VfbSelect",
    props: ["options", "modelValue", "state"],
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
