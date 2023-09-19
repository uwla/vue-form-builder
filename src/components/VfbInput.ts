import { defineComponent } from "vue"

export default defineComponent({
    computed: {
        val: {
            get() {
                return this.modelValue
            },
            set(value: any) {
                this.$emit('update:modelValue', value)
            }
        }
    },
    props: ['modelValue', 'state']
})