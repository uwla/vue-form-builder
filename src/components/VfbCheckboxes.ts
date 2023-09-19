import { defineComponent } from "vue"

export default defineComponent({
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
    props: ['value', 'options', 'name', 'state', 'id']
})