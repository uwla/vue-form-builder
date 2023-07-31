export default {
    data() {
        return {
            checked: this.value
        }
    },
    methods: {
        handleInput() {
            this.$emit('input', this.checked)
        }
    },
    props: ['value', 'options']
}