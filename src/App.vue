<template>
    <div id="app">
        <h1>TITLE</h1>
        <form-builder v-bind="{fields, form}"></form-builder>
    </div>
</template>

<script>
export default {
    name: "App",

    data() {
        return {
            fields: [
                'name:name|text',
                'name:email|label:Email address|email|autocomplete:email',
                'name:password|password|autocomplete:new-password',
                'name:password_confirmation|password|autocomplete:new-password',
                {name: "country", options: {val1: 1, val2: 2, val3: 3}}
            ],
            form: {
                errors: {}
            }
        }
    }
}
</script>

<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: justify;
    color: #2c3e50;
}

h1 {
    text-align: center;
}
</style>
