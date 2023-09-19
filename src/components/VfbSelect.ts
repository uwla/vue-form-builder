import { defineComponent } from "vue"

export default defineComponent({
    computed: {
        selected: {
            get() {
                return this.value
            },
            set(newValue: any) {
                this.$emit('input', newValue)
            }
        }
    },
    props: ['options', 'value', 'state', 'multiple']
})