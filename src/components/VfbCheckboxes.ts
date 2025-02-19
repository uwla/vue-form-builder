import { defineComponent } from "vue"

export default defineComponent({
    props: ["modelValue", "options", "name", "state", "id"],
    methods: {
        handleInput(e: any) {
            const target = e.target
            const value = target.value
            let newChecked = [...this.modelValue]
            if (newChecked.includes(value))
                newChecked = newChecked.filter(v => v !== value)
            else newChecked.push(value)
            this.$emit("update:modelValue", newChecked)
        },
    },
})
