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
4. [Configuration](#customize-configuration)
    - [fields](#fields)
    - [model](#model)
    - [errors](#errors)
    - [formButtons](#formButtons)
    - [Aliases](#aliases)
    - [Slots](#Slots)
5. [License](#license)
6. [Versioning](#versioning)
7. [Contributing](#contributing)
8. [Authors](#authors)

## Demo

The best way to see if a package suits your needs is by viewing and editing a demo project. Here are some code playground in which you can test Vue Form Builder.

- [Demo01](https://codesandbox.io/s/vue-form-builder-demo01-i73n3?file=/src/App.vue)

## Features

- Automatically displays inline error messages from a Laravel server
- Automatically generates form fields with bootstrap classes
- Can create any form field (select, checkbox, range, date, textarea, password, etc)
- Is highly customizable (pass any html attribute to a field; allows labels to render html)
- [Custom aliases](#aliases)
- [Smart guessing](#smart-guessing)

### Smart guessing

Vue Form Builder allows us to omit certain parameters. It will guess what we want based on what we provide. For example, if we pass `["name", "email", "password", "password_confirmation"]`, Vue Form Builder will create four input fields with the name, id, label, and type matching the given items.

If we don't specify a css id, a label text, Vue Form Builder will use the name attribute as a fallback for these values. Moreover, it converts name attributes (created_at, personalInfo, etc) to a more human-friendly format (Created at, Personal Info).

Another example is that, if you specify the type attribute, you don't need to specify the field's tag name (input, textarea, select) because only input elements have a type attribute. Vue Form Builder will automatically creates an input element if you specify the type attribute.

## Getting started

### Installation

```shell
npm install --save @andresouzaabreu/vue-form-builder
```

### Set up

```javascript
// globally
import FormBuilder from '@andresouzaabreu/vue-form-builder';
Vue.component("form-builder", FormBuilder)

//locally
import FormBuilder from '@andresouzaabreu/vue-form-builder';
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

```html
<template>
    <div>
        <form-builder v-bind="{ fields, model, errors }"/>
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
                   options: ["Admin", "Editor", "Author", "User", "Manager"]
               }
            ],
            model: {
                name: "",
                email: "",
                photo: "",
                role: "",
            },
            /* each key in the error object should be the name of a form field.
            Its value should be an array of strings (each string is an error)
            */
            errors: {}
        }
    }
}
</script>
```

## Configuration

| prop | type | default | description |
| --- | --- | --- |  --- |
| fields | `Array` | - | Specify how the form fields should be rendered |
| model | `Object` | - | When user inputs something, it will update the model object. |
| errors | `Object` | `{}` | Error messages to display |
| formButtons | `Object` | `{}` | Specify how to display the form buttons |
| fieldClass | `String` | `form-control` | The css class of form fields|
| fieldGroupClass | `String` | `form-group` | The css class of the div wrapping the form fields |
| showButtons | `Boolean` | `true` | Whether to render the form buttons provided by Form Builder |
| showInlineErrors | `Boolean` | `true` | Whether to display the error message inline |
| showErrorList | `Boolean` | `false` | Whether to display the error messages as a list |

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
    "name:gender|range|options:" + JSON.stringify({M: "male", F: "female"}),
    {
        name: "country",
        options: {...["China", "Spain", "USA", "Canada"]}
    },
]
```

If the field is a string, we need to use `|` to separate the field attributes (this can be Html attributes, label text, element type, select options, etc). The order of the attributes does not matter (e.g, `name:email|text` is the sane as `text|name:email`).

### model

The `model` object contains the values of the form fields. The field value the user inputs will get updated in the `model`.

Javascript Example:

```javascript

export default {
    name: "LoginForm",
    data() {
        return {
            fields: [
                'name:username|label:Your username please|text',
                'name:password|label:Your password please|password',
            ],
            model: {
                username: "",
                password: "",
            },
            errors: {}
        }
    },
    methods: {
        attemptLogin() {
            axios.post('/api/login', this.model).then(response => {
                /* log the user in */
            }).catch(error => {
                /* the response from the server can be accessed through error.response
                The response object contains things such as headers, status code, and so
                on. We are interested in the data property of the response object. The
                data property should have the validation errors.
                */
                let data = error.response.data;
                this.errors =data.errors;
            })
        }
    }
}
```

in vue template:

```html
<form-builder v-bind="{ fields, model, errors }" @submit="attemptLogin()">
```

### errors

The errors prop must be an object with keys equal to the field names and values equal to an array of error for the associated field. For Example:

```js
{
    username: ["Username must be at least 5 characters long", "Username can contain only letters and numbers"],
    email: ["Invalid email"],
    password: ["Password confirmation does not match"]
}
```

### formButtons

| prop | type | default |
| --- | --- | --- |
| submitButtonText | `String` | "SAVE" |
| cancelButtonText | `String` | "CANCEL" |
| submitButtonAttr | `Object` | {class: "btn btn-success", type: "submit"} |
| cancelButtonAttr | `Object` | {class: "btn btn-danger", type: "reset"} |
| wrapperAttr | `Object` | {class: "form-group form-button-container"} |

**Note**: Attr means Html Attributes in this context.

### showButtons

Vue Form Builds automatically appends form buttons at the bottom of the form. You can disable that by setting `showButtons` to false. You can use your own form buttons. For example:

```html
<template>
    <form-builder v-bind="{ fields, model }">
        <div>
            <button @click="submit()">SAVE</button>
            <button @click="resetForm()">CANCEL</button>
        </div>
    </form-builder>
</template>
```

### aliases

You can use aliases to reuse the same configuration accross multiple forms. Here is one example.

```javascript
fields: ["name", "email", "age", "photo", "password", "password_confirmation"]
```

This will generate the following HTML:

```html
<form>
    <div class="form-group">
        <label for="name">Name</label>
        <input id="name" name="name" type="text" class="form-control" />
    </div>
    <div class="form-group">
        <label for="email">Email</label>
        <input id="email" name="email" type="email" class="form-control" />
    </div>
    <div class="form-group">
        <label for="age">Age</label>
        <input id="age" name="age" type="number" class="form-control"/>
    </div>
    <div class="form-group">
        <label for="photo">Photo</label>
        <input id="photo" name="photo" type="file" accept="image/*" class="form-control"/>
    </div>
    <div class="form-group">
        <label for="password">Password</label>
        <input id="password" name="password" type="password" class="form-control"/>
    </div>
    <div class="form-group">
        <label for="password_confirmation">Password confirmation</label>
        <input id="password_confirmation" name="password_confirmation" type="password" class="form-control"/>
    </div>
    <div class="form-group form-button-container">
        <button type="reset" class="btn btn-danger">CANCEL</button>
        <button type="submit" class="btn btn-success">SAVE</button>
    </div>
</form>
```

The following aliases are enable by default:

```javascript
{
    name: "name:name|text",
    fname: "name:fname|text",
    lname: "name:lname|text",
    username: "name:username|text",
    email: "name:email|email",
    email_confirmation: "name:email_confirmation|email",
    password: "name:password|password",
    password_confirmation: "name:password_confirmation|password",
    age: "name:age|number",
    birthday: "name:birthday|date",
    photo: "name:photo|file|accept:image/*",
    picture: "name:picture|file|accept:image/*",
    profile_picture: "name:profile_picture|file|accept:image/*",
}
```

We can override the aliases above or define our custom aliases as follow:

```javascript
import { fieldAliases } fro '@andresouzaabreu/vue-form-builder';

const customAliases = {
    country: "name:country|text",
    phone: "name:phone|number|label:Phone number|pattern:^[0-9]{4}-[0-9]{4}$"
    /*... more aliases*/
};

// add single alias
fieldAliases.setAlias("birthday", "name:birthday|date|label:Your birthday");

// add new aliases in addition to the default ones
fieldAliases.setAliases(customAliases);

// you may want to remove an alias
fieldAliases.removeAlias("email");

// or maybe reset all aliases
fieldAliases.resetAliases();

// get the aliases (we probably won't need this, unless to debug)
console.log(fieldAliases.getAlias("country"));

// get all of them
console.log(fieldAliases.getAliases());
```

**Note**: Define your custom aliases before registering FormBuilder as Vue component.

### slots

Vue Form Builder has three slots that allow us to customize our forms.

- Start: appends content before creating the fields we specify.
- Default: inserts content after creating the fields we specify.
- End: prepends content after the form buttons.

Example:

```html
<template>
    <div>
        <form-builder v-bind="{ fields, model, errors }">
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
            model: {
                /* ... */
            },
            errors: {
                name: ["Name too long", "Only characters allowed"]
            },
        };
    }
};
</script>
```

Will render something like

```html
<!-- Any HTML comments that are listed below won't show up.
They are just explaining things -->
<div>
    <form>
        <!-- start -->
        <p>We need to collect some personal information before we proceed</p>
        <!--/start -->

        <div class="form-group">
            <label for="name">Name</label>
            <!-- class is invalid is due to errors -->
            <input class="form-control is-invalid" name="name" id="name" type="text">

            <!-- below are the errors. They show up only if specified -->
            <div class="help-block invalid-feedback">
                <span>Name too long</span>
                <span>Only characters allowed</span>
            </div>
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

### errors outside the form

We can display the errors outside VueFormBuilder.

Example below will not display error inside the form, but will show them as a list of error above the form. That is useful to display error somewhere else in the webpage.

```html
<template>
    <div>
        <div class="custom-error-list">
            <!-- the errors prop must be A FLAT ARRAY OF STRINGS !
            The errors will be displayed as a list -->
            <error-list :errors="errors" errorMessage="Ops! Please, correct your input as indicated" />
        </div>
        <form-builder v-bind="{ fields, model, showInlineErrors: false }" />
    </div>
</template>
<script>
import { ErrorList } from "@andresouzaabreu/vue-form-builder";
export default {
    components: { ErrorList },
    data() {
        return {
            model: /**/,
            fields: /**/,
            errors: /**/,
        }
    },
}
</script>
```

We can also use inline error if we have more complex fields (which VueFormBuilder may not be able to render)

```html
<template>
    <form-builder v-bind="{ fields, model }" >
        <div class="form-group">
            <label>Article body</label>
            <textarea id="ckeditor" name="body">
            <inline-error v-if="errors.body" :errors="errors.body">
        </div>
    </form-builder>
</template>
<script>
import { InlineError } from "@andresouzaabreu/vue-form-builder";
export default {
    components: { InlineError },
    /* ... */
}
</script>
```

## License

See the [LICENSE](LICENSE.md) file for details

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/AndreSouzaAbreu/vue-form-builder/tags).

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Author

- **André Souza Abreu** - *Initial work* - [Github](https://github.com/AndreSouzaAbreu)

See also the list of [contributors](https://github.com/AndreSouzaAbreu/vue-form-builder/contributors) who participated in this project.
