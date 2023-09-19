import { defineComponent } from "vue"

export default defineComponent({
    computed: {
        val: {
            get() {
                return this.value
            },
            set(value: any) {
                this.$emit('input', value)
            }
        }
    },
    props: ['value', 'state']
})