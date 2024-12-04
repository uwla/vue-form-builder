import { defineComponent } from "vue"

export default defineComponent({
    name: "VfbTags",
    data() {
        return {
            query: "",
        }
    },
    computed: {
        searchResults() {
            const values = this.modelValue as string[];
            const query = this.query.toLowerCase();
            return (this.options as any[]).filter((option: any) => {
                const value = option.value;
                const text = option.text.toLowerCase();
                return text.includes(query) && ! values.includes(value);
            })
        }
    },
    methods: {
        handleInput(e : any) {
            let target = e.target
            let value = target.value
            let newChecked = [...this.modelValue as string[]]
            if (newChecked.includes(value))
                newChecked = newChecked.filter(v => v !== value)
            else
                newChecked.push(value)
            this.$emit('update:modelValue', newChecked)
        },
        removeTag(tag: string) {
            const newChecked = (this.modelValue as string[]).filter((x: string) => x !== tag);
            this.$emit('update:modelValue', newChecked)
        },
    },
    props: {
        options: {
            type: Array,
            required: true,
        },
        modelValue: {
            type: Array,
            required: true,
        },
        state: {
            type: Boolean,
            default: null
        },
        placeholder: {
            type: String,
            default: "search..."
        },
        emptyResults: {
            type: String,
            default: "0 items matching the search..."
        },
        id: String,
        name: String,
    }
})
