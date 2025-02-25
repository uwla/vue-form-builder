import { defineComponent } from "vue"

export default defineComponent({
    name: "VfbFile",
    props: {
        modelValue: [Object, Array, String],
        multiple: Boolean,
        state: { type: Boolean, default: undefined },
    },
    emits: ["update:modelValue"],
    methods: {
        handleInput(e: any) {
            const { files } = e.target
            if (this.multiple) this.$emit("update:modelValue", files)
            else this.$emit("update:modelValue", files[0])
        },
    },
})
