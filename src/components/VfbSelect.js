export default {
    computed: {
        selected: {
            get() {
                return this.value
            },
            set(newValue) {
                this.$emit('input', newValue)
            }
        }
    },
    props: ['options', 'value']
}
