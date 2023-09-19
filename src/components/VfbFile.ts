import { defineComponent } from "vue"

export default defineComponent({
    methods: {
        handleInput(e: any) {
            const { files } = e.target
            if (this.multiple)
                this.$emit('input', files)
            else
                this.$emit('input', files[0])
        }
    },
    props: ['value', 'multiple', 'state']
})