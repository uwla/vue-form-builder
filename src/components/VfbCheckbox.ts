import { defineComponent } from "vue"

export default defineComponent({
    data() {
        return {
            checked: this.modelValue
        }
    },
    methods: {
        handleInput() {
            this.$emit('update:modelValue', this.checked)
        }
    },
    props: ['modelValue']
})