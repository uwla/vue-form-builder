export default {
    computed: {
        text: {
            get() {
                return this.value
            },
            set(val) {
                this.$emit('input', val)
            }
        }
    },
    props: ['value'],
}