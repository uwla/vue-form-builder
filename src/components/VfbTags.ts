import { defineComponent } from "vue"

export default defineComponent({
    name: "VfbTags",
    data() {
        return {
            query: "",
        }
    },
    methods: {
        handleInput(e : any) {
            let target = e.target
            let value = target.value
            let newChecked = [...this.modelValue]
            if (newChecked.includes(value))
                newChecked = newChecked.filter(v => v !== value)
            else
                newChecked.push(value)
            this.$emit('update:modelValue', newChecked)
        },
        removeTag(tag: string) {
            const newChecked = this.modelValue.filter((x: string) => x !== tag);
            this.$emit('update:modelValue', newChecked)
        },
    },
    props: [
        'options',
        'modelValue',
        'state',
        'placeholder',
    ]
})
