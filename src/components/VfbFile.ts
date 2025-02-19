import { defineComponent } from "vue"

export default defineComponent({
    props: ["modelValue", "multiple", "state"],
    methods: {
        handleInput(e: any) {
            const { files } = e.target
            if (this.multiple) this.$emit("update:modelValue", files)
            else this.$emit("update:modelValue", files[0])
        },
    },
})
