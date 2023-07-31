export default {
    methods: {
        handleInput(e) {
            const { files } = e.target
            if (this.multiple)
                this.$emit('input', files)
            else
                this.$emit('input', files[0])
        }
    },
    props: ['value', 'multiple']
}