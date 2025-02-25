import { defineComponent } from "vue"

export default defineComponent({
    name: "VfbCheckboxes",
    props: {
        modelValue: { type: Array },
        options: { type: Array },
        name: { type: String },
        state: { type: Boolean, default: undefined },
        id: { type: String },
    },
    emits: ["update:modelValue"],
    methods: {
        handleInput(e: any) {
            const target = e.target
            const value = target.value
            let newChecked = [...(this.modelValue || [])]
            if (newChecked.includes(value))
                newChecked = newChecked.filter(v => v !== value)
            else newChecked.push(value)
            this.$emit("update:modelValue", newChecked)
        },
    },
})
