import { defineComponent } from "vue"

export default defineComponent({
    props: ["modelValue", "state"],
    emits: ["update:modelValue"],
    computed: {
        text: {
            get() {
                return this.modelValue
            },
            set(val: any) {
                this.$emit("update:modelValue", val)
            },
        },
    },
})
