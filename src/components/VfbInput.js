export default {
    computed: {
        val: {
            get() {
                return this.value
            },
            set(value) {
                this.$emit('input', value)
            }
        }
    },
    props: ['value', 'state']
}