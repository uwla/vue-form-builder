<template>
    <div id="app">
        <h1>TITLE</h1>
        <main>
            <form-builder v-bind="{fields, form}"></form-builder>
        </main>
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
                'name:age|number|min:18|max:100',
                'name:hair_color|color',
                {name: "country", type: "checkbox", options:
                    ['Brazil', 'EUA', 'Itália', 'Japão', 'China', 'Rússia', 'França', 'Alemanha']
                        .reduce((paises, pais, i) => ({...paises, ...{[i]: pais}}), {})
                },
                'name:info|label:Personal info|textarea|rows:5|cols:15'
            ],
            form: {
                errors: {}
            }
        }
    }
}
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: justify;
    padding: 32px;
    color: #2c3e50;
}
main {
    max-width: 500px;
    margin: 0 auto;
}

h1 {
    text-align: center;
}
</style>
