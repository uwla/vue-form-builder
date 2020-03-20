<template>
    <ul>
        <li v-for="(text, value) in options" :key="value">
            <input v-bind="html_attributes" :id="(css_id + value)">

            <label :for="(css_id + value)">
                {{ text }}
            </label>
        </li>
    </ul>
</template>

<script>
import FormField from '../FormField'

export default {
    name: "FormFieldCheckbox",
    mixins: [FormField],
}
</script>

<style lang="scss" scoped>
ul {
    max-height: 250px;
    overflow: auto;
    padding: 0;

    li {
        display: flex;
        align-items: center;
        justify-content: stretch;
        border-top: .8px solid #ccc;

        &:last-of-type {
            border-bottom: .8px solid #ccc;
        }

        input, label {
            width: auto;
            margin: 0;
            cursor: pointer;
            user-select: none;
            height: auto;
            padding: .4rem 0;

            &, &:focus {
                outline: none;
                border: none;
                box-shadow: none;
            }
        }

        input {
            margin-right: .5rem
        }

        label {
            flex-grow: 5;

        }
    }
}


</style>
