import { defineComponent } from "vue"

export default defineComponent({
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
        }
    },
    props: ['modelValue', 'options', 'name', 'state', 'id']
})