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
        <form-builder v-bind="{ fields }"/>
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
        }
    }
}
</script>
```

## Customize configuration

| prop | type | default | description |
| --- | --- | --- |
| fields | `Array` | - | Specify how the form fields should be rendered |
| form | `Object` | `{}` | Send requests to the AṔI and handle errors |
| formButtons | `Object` | `{}` | Specify how to display the form buttons |
| enableButtons | `Boolean` | `true` | Whether to render the form buttons provided by Form Builder |
| fieldClass | `String` | `form-control` | The css class of form fields|
| fieldGroupClass | `String` | `form-group` | The css class of the div wrapping the form fields |
| inlineErrors | `Boolean` | `true` | Whether to display the error message inline |
| ErrorList | `Boolean` | `false` | Whether to display the error messages as a list |

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

The `form` must an instance of the `Form` class provided by Vue Form Builder. The form automatically handles error responses from the server and display them either as inline error messages or in a list (which is defined in the props).

Javascript Example:

```javascript
const formOptions = {
    fields: ['username', 'password'],
}

import { Form } from '@andresouzaabreu/vue-form-builder';
const form = new Form(formOptions);

export default {
    name: "LoginForm",
    data() {
        return {
            // specify how to render the fields
            fields: [
                'name:username|label:Your username please|text',
                'name:password|label:Your password please|password',
            ],
            form: form,
        }
    },
    methods: {
        attemptLogin() {
            form.post('/api/login').then(response => {
                /* log the user in */
            }).catch(e => {
                /*
                There is no need to catch errors because
                the Form will automatically do it for us.
                So we don't need to write anything here.
                */
            })
        }
    }
}
```

in vue template:

```html
<form-builder v-bind="{ fields, form }" @submit="attemptLogin()">
```

#### fields

When creating a Form instance, we must specify some options. The most important one is the fields. For example:

```javascript
const formOptions = {
    fields: ['username', 'password'],
}

import { Form } from '@andresouzaabreu/vue-form-builder';
const form = new Form(formOptions);
```

```javascript
// this will print the value the user has entered in the fields.
// It syncs automatically. Take care with it
console.log(form.username, form.password)
```

#### secretes

When dealing with sensitive information, security is a must have. For that matter, we can specify which form fields should be cleared after each request.

```javascript
const formOptions = {
    fields: ['username', 'password'],
    secretes: ['password']
}

import { Form } from '@andresouzaabreu/vue-form-builder';
const form = new Form(formOptions);
```

After submitting the form, the password field will be cleared regardless of whether the request has failed or succeed.

By default, the following secretes are enabled in the `Form` class:

```javascript
get _secretes() {
    return this._.secretes || ['password', 'password_confirmation']
}
```

You can specify as many secretes as you want. The fields defined in secretes will always be cleared and they cannot have a default value.

#### default field values

We can specify default values for form fields as follows

```javascript
const formOptions = {
    fields: ['name', 'email', 'country', 'want_subscribe'],
    defaults: [
        'name': '',
        'email': '',
        'country': 'US',
        'want_subscribe': true,
    ]
}

import { Form } from '@andresouzaabreu/vue-form-builder';
const form = new Form(formOptions);

export default {
    name: "NewsletterForm",
    data() {
        return {
            // specify how to render the fields
            fields: [
                'name:name|text|required',
                'name:email|email|required',
                {
                    name: 'country',
                    options: ['US', 'Canada', 'Japan', 'South Africa', /* ... more*/]
                },
                {
                    name: 'want_subscribe',
                    label: 'Subscribe for our newsletter!',
                    type: 'checkbox'
                    options: {
                        /* the syntax is value : text*/
                        'true': 'Yes'
                        'false': 'No, thanks'
                    }
                }
            ],
            form: form,
        }
    },
}
```

#### omit null fields

If we set the option omit null to true, then empty fields will not be sent along with the request. Otherwise, empty fields will be sent. The default value is true.

```javascript
const formOptions = {
    fields: ['name', 'email', 'country', 'want_subscribe'],
    omitNull: false
}

const form = new Form(formOptions);
```

#### omitted fields

We can omit form fields so that they will not be sent with the request. This is useful, for example, if we do not want to send additional fields in our request depending on if the user is logged in, if the user is subscribed to a service, and so on.

```javascript
const formOptions = {
    omitted: ['password'] // do not send the password field, regardless if it is filled out
}
```

I'm sorry, but I could not think about a practical example of using `omitted`.

#### fillable

We can use FormBuilder to create and update resources, such as messages, users, articles, and so on. When we are editing an existing resource, we want to populate it with existing data. For that matter, we can fill out the form with the data.

```javascript
const user = {
    name: 'Jane',
    email: 'jane@email.example',
    age: 25,
    country: 'German',
    role: 'Editor'
};

const options = {
    fields: ['name', 'email', 'role', 'age', 'country']
};

const form = new Form(options);

form.fill(user);
console.log(form.role) // outputs Editor
```

Filling out forms dynamically is very convenient because we don't have to fill out each field individually. However When filling out the form with user input, or with data from an api, we must take care because there is a security vulnerability called Mass Assignment. That can happen when we fill out several variables with values from user input without checking each of them.

To prevent undesirable mass assignment, we can specify which values are fillable. A fillable field means that this field is mass assignable (can be assigned dynamically). By default, every field defined in fields are fillable. If we don't want this, we can specify as follows:

```javascript
const maliciousInput = {
    name: 'Jane',
    email: 'jane@email.example',
    age: 25,
    country: 'German',
    role: 'Admin' // pay attention here !!
};

const options = {
    fields: ['name', 'email', 'role', 'age', 'country'],
    fillabe: ['name', 'email', 'age', 'country']
};

const form = new Form(options);

form.fill(maliciousInput);
console.log(form.role) // outputs "undefined" because 'role' is not fillable
console.log(form.name) // outputs "Jane" because 'name' is fillable
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

#### requests

We can use form to send requests to our API. When sending the requests, the values in the form will automatically be sent with the request!

```javascript
// create a new user. Data is sent automatically
form.post('/api/users/').then(() => {/* do stuff */})

// update a user.
form.put('/api/users/' + form.id ).then(() => {/* do stuff */})
// or
form.patch('/api/users/' + form.id ).then(() => {/* do stuff */})

// it can also delete a user, but it is not intended for this purpose
form.delete('/api/users/' + form.id).then(() => {/* do stuff */})
```

`Form`uses `axios` to send ajax requests. Later on, we will enable the option to add a custom api client.

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
import { FieldAliases } fro '@andresouzaabreu/vue-form-builder';

const customAliases = {
    country: "name:country|text",
    phone: "name:phone|number|label:Phone number|pattern:^[0-9]{4}-[0-9]{4}$"
    /*... more aliases*/
};

// register new aliases in addition to the default ones
FieldAliases.registerAliases(customAliases);

// set the aliases. This will delete default aliases and set new ones.
FieldAliases.setAliases(customAliases);

// get the aliases (we probably won't need this, unless to debug)
console.log(FieldAliases.getAliases());
```

**Note**: Define your custom aliases before registering FormBuilder as Vue component.

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
