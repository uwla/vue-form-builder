# VUE FORM BUILDER

A Vue plugin that automatically generates beautiful forms using bootstrap and displays error messages from the server.

## Table of contents

1. [Demo](#demo)
2. [Features](#features)
    - [Smart guessing](#smart-guessing)
3. [Getting started](#getting-started)
    - [Installation](#installation)
    - [Set Up](#set-up)
    - [Use](#use)
4. [Customize configuration](#get-started)
    - [Columns](#columns)
    - [Lang](#lang)
    - [Action Buttons](#action-buttons)
    - [Sorting Components](#sorting-components)
5. [License](#license)
6. [Versioning](#versioning)
7. [Contributing](#contributing)
8. [Authors](#authors)
9. [Built-with](#built-with)

## Demo

The best way to see if a package suits your needs is by viewing and editing a demo project. Here are some codeplayground in which you can test Vue Form Builder.

- [Demo01](https://codesandbox.io/s/vue-form-builder-demo01-i73n3?file=/src/main.js)

## Features

- Automatically displays inline error messages from a Laravel server
- Automatically generates form fields using bootstrap
- Can create any form field (select, checkbox, range, date, textarea, password, etc)
- Is highly customizable (pass any html attribute to a field; allows labels to render html)
- [Smart guessing](#smart-guessing)

### Smart guessing

If we don't speficy a css id, a label text, Vue Form Builder will use the name attribute as a fallback for these values. Moreover, it converts name attributes (created_at, personalInfo, etc) to a more human-friendly format (Created at, Personal Info).

Another example is that, if you specify the type attribute, you don't need to speficy the field's tagname (input, textarea, select) because only input elements have a type attribute. Vue Form Builder will automatically creates an input element if you specify the type attribute.

These are just two examples of smart guessing that Vue Form Builder performs.

## Getting started

### Installation

```shell
npm install --save @andresouzaabreu/vue-form-builder
```

### Set up

```javascript
// globally
import FormBuilder from '@andresouzaabreu/vue-form-builder'
Vue.component("form-builder", FormBuilder)

//locally
import FormBuilder from '@andresouzaabreu/vue-form-builder'
export default {
    name: "MyComponent"
    components: {
        FormBuilder,
    }
}
```

Besides bootstrap, Vue Form Builder uses its own css. Add these lines below to main.js to import the stylesheets.

```javascript
import 'bootstrap/dist/css/bootstrap.min.css'
import '@andresouzaabreu/vue-form-builder/dist/FormBuilder.css'
```

### Use

```vue
<template>
    <div>
        <form-builder v-bind="{fields}"/>
    </div>
</template>

<script>
export default {
    data() {
        return {
            fields: [
                "name:name|text",
                "name:email|email|label:Email address",
                "file|name:photo",,
               {
                   name: "role",
                   type: "checkbox",
                   options: {...["Admin", "Editor", "Author", "User", "Manager"]}
               }
            ],
        }
    }
}
</script>
```

## Customize configuration

| prop | type | default |
| --- | --- | --- |
| fields | `Array` | - |
| form | `Object` | - |
| formButtons | `Object` | {} |
| enableButtons | `Boolean` | true |

### fields

The fields array contains objects or strings representing a field. Here are some examples:

```javascript
[
    // we can pass any id, class, etc
    'name:personal_info|textarea|class:pretty-editor',
    'name:article|textarea|id:ckeditor',

    // we can pass any html attributes
    'name:age|min:18|max:60|required|label:Enter your age, please|number',
    'name:phone|pattern:^[0-9]{2}-[0-9]{4}-[0-9]{4}$|label:Phone number|text',
    'name:id|hidden|element:input',
    "name:birthday|date",

    // we can use html in our labels
    'name:ccd|number|label: Credit Card code ' +
        '<i class="fa fa-info" data-toggle="tooltip" title="The three digits behind the card"></i>',

    // we can pass objects
    "name:gender|range|options:" + JSON.toString({M: "male", F: "female"}),
    {
        name: "country",
        options: {...["China", "Spain", "USA", "Canada"]}
    }
]
```

If the field is a string, we need to use `|` to separate the field attributes (this can be Html attributes, label text, element type, select options, etc). The order of the attributes does not matter (e.g, `name:email|text` is the sane as `text|name:email`).

### form

The `form` object contains the values of the form fields. The field value the user inputs will get updated in the `form`.

The `form` must an instance of [vform](https://github.com/cretueusebiu/vform).`VForm` facilitates form submission and error message displaying from a Laravel server. Vue Form Builder uses `VForm` to automatically display inline error messages. It also adds an invalid bootstrap class to that field.

### formButtons

| prop | type | default |
| --- | --- | --- |
| submitButtonText | `String` | "SAVE" |
| cancelButtonText | `String` | "CANCEL" |
| submitButtonAttr | `Object` | {class: "btn btn-success", type: "submit"} |
| cancelButtonAttr | `Object` | {class: "btn btn-danger", type: "reset"} |
| wrapperAttr | `Object` | {class: "form-group form-button-container"} |

**Note**: Attr means Html Attributes in this context.

### enableButtons

Vue Form Builds automatically appends form buttons at the bottom of the form. You can disable that by setting `enableButtons` to false. You can use your own form buttons. For example:

```vue
<template>
    <form-builder v-bind="{fields, form}">
        <div>
            <button @click="submit()">SAVE</button>
            <button @click="resetForm()">CANCEL</button>
        </div>
    </form-builder>
</template>
```

### slots

Vue Form Builder has three slots that allow us to customize our forms.

- Start: appends content before creating the fields we specify.
- Default: inserts content after creating the fields we specify.
- End: prepends content after the form buttons.

Example:

```vue
<template>
    <div>
        <form-builder v-bind="{fields}">
            <template #start>
                <p>We need to collect some personal information before we proceed</p>
            </template>

            <div>
                <select id="custom-select"></select> <!-- a custom select -->
            </div>

            <template #end>
                <p>By submitting this form, you agree with our terms and conditions</p>
            </template>
        </form-builder>
    </div>
</template>

<script>
export default {
    data() {
        return {
            fields: [
                "name:name|text",
                "name:email|email|label:Email address",
            ],
        }
    }
}
```

Will render something like

```html
<div>
    <form>
        <!-- start -->
        <p>We need to collect some personal information before we proceed</p>
        <!--/start -->

        <div class="form-group">
            <label for="name">Name</label>
            <input class="form-control" name="name" id="name" type="text">
        </div>
        <div class="form-group">
            <label for="email">Email address</label>
            <input class="form-control" name="email" id="email" type="email">
        </div>

        <!-- default -->
        <div>
            <select id="custom-select"></select>
        </div>
        <!--/default -->

        <div class="form-group form-button-container">
            <button class="btn btn-danger" type="reset">CANCEL</button>
            <button class="btn btn-success" type="submit">SAVE</button>
        </div>

        <!-- end -->
        <p>By submitting this form, you agree with our terms and conditions</p>
        <!--/end -->
    </form>
</div>
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE.md) file for details

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/AndreSouzaAbreu/vue-form-builder/tags).

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Author

- **André Souza Abreu** - *Initial work* - [Github](https://github.com/AndreSouzaAbreu)

See also the list of [contributors](https://github.com/AndreSouzaAbreu/vue-form-builder/contributors) who participated in this project.
