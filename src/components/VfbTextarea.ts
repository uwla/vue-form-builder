import { defineComponent } from "vue"

export default defineComponent({
    computed: {
        text: {
            get() {
                return this.modelValue
            },
            set(val: any) {
                this.$emit('update:modelValue', val)
            }
        }
    },
    props: ['modelValue', 'state'],
})