import { defineComponent } from "vue"

export default defineComponent({
    computed: {
        selected: {
            get() {
                return this.modelValue
            },
            set(newValue: any) {
                this.$emit('update:modelValue', newValue)
            }
        }
    },
    props: ['options', 'modelValue', 'state',]
})