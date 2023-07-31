export default {
    data() {
        return {
            checked: ''
        }
    },
    methods: {
        handleInput() {
            this.$emit('input', this.checked)
        }
    },
    props: ['value']
}