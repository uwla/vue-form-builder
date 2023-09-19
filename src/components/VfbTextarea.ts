import { defineComponent } from "vue"

export default defineComponent({
    computed: {
        text: {
            get() {
                return this.value
            },
            set(val: any) {
                this.$emit('input', val)
            }
        }
    },
    props: ['value', 'state'],
})