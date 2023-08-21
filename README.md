# VUE FORM BUILDER

## Features

- concise syntax for fast development
- support for custom components
- can prefill the values of form fields
- integration with Bootstrap Vue
- shows error messages next to field
- shows success messages next to field
- validates fields when user enters input
- validates form upon submission
- validation rules
- custom components

## Demo

A demo app is available:

- [live demo](https://4rxmw4.csb.app/)
- [live demo and code](https://codesandbox.io/s/vue-form-builder-demo-4rxmw4)
- [code](https://github.com/uwla/vue-form-builder-demo)

## Installation

Install via NPM:

```shell
npm install @uwlajs/vue-form-builder
```

## Configuration

### Props

 he only required property is `fields`.

| name                 | type    | default | description                                             |
| -------------------- | ------- | ------- | ------------------------------------------------------- |
| clearFeedbackOnInput | Boolean | `true`  | Whether to clear feedback on user input.                |
| errors               | Object  | `{}`    | An object describing errors to show below the fields.   |
| fields               | Array   | -       | An array describing how to render the fields.           |
| messages             | Object  | `{}`    | An object describing messages to show below the fields. |
| model                | Object  | `{}`    | An object with the default values for the fields.       |
| useBootstrap         | Boolean | `false` | Whether to use Bootstrap Vue components.                |
| validateOnSubmit     | Boolean | `true`  | Whether to validate the form upon submission.           |
| validateOnInput      | Boolean | `true`  | Whether to validate fields upon user input.             |
| validation           | Object  | `{}`    | An object with the validation rules.                    |
| wrapper              | String  | `null`  | Default field wrapper component.                        |

### Fields

Each field has 

| name         | type               | default       |  description                                                                     |
| ------------ | ------------------ | ------------- |  ------------------------------------------------------------------------------- |
| name         | `String`           | -             |  Name of the field                                                               |
| label        | `String`           | dynamic       |  Label to be displayed by the wrapper.                                           |
| component    | `String`, `Object` | dynamic       |  Vue Component that renders the field.                                           |
| props        | `Object`           | dynamic       |  Properties for the field component (both Vue props and HTML attributes)         |
| propsWapper  | `Object`           | dynamic       |  Properties for the field wrapper component (both Vue props and HTML attributes) |
| type         | `String`           | dynamic       |  Field type, used to determine which Vue Component to use (if not specified)     |
| wrapper      | `String`, `Object` | `vfb-wrapper` |  Vue Component wrapping the field.                                               |

Most  attributes  are  optional,  but  some  are  required.  If  `component`  is
specified, then `name` is optional.

Some fields do not have a default value, because their default value depends  on
other attibutes. For example, if `type` is  `file`,  then  `component`  will  be
`vfb-file` (default) or `b-form-file` if `useBootstrap` is set to `true`.

The `name` field is required if you want to display  feedback  for  that  field,
apply validation rules, or get user input when the form is submitted.

If `label` is not set but `name` is, then `label` will be `titleCase(name)`.  In
other words, transform `name` into titleCase format. The `label` can be  set  to
the string `none` if no label should be displayed.set.

A random `id` is generated and passed to `props` and `propsWrapper`, so that the
`field` component can set the CSS id of the field (input, select, textarea, etc)
and the `wrapper` component can set the proper `for` attribute of the label.

As said before, `label` and `id` are  passed  to  the  `wrapper`  component.  If
`propsWrapper` is not set, it will default to `{label: label, labelFor: id}`. If
`propsWrapper` is set, it won't be changed by this  plugin  and  the  programmer
shall take care of passing the desired properties to the `wrapper`.

#### Aliases

### Bootstrap Vue

If set to `true`, it will use [BootstrapVue form components](https://bootstrap-vue.org/docs/components/).

Notice that you have to explicitly install BootstrapVue:

```shell
npm install bootstrap-vue bootstrap@^4.6
```

Then import the JavaScript and CSS:

```javascript
import Vue from 'vue'
import { BootstrapVue } from 'bootstrap-vue'

// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
```

More instructions can be found on the [official page](https://bootstrap-vue.org/docs#getting-started)

### Components

#### Custom component

#### Custom wrapper

### Feedback

#### Errors

#### Message

#### Custom feedback component

### Validation

The validation is an object mapping a field name to a function. Example:

```javascript
const validation = {
    name: (val) => {
        if (val.length < 3)
            return 'Name too short'
        if (val.length > 30)
            return 'Name too long'
        return true
    },
    age: (val) => {
        if (val < 18)
            return false
        return true
    }
    fruits: (val) => {
        // val is an array of fruits
        if (val.length > 3)
            return 'Pick 3 fruits at most'
        if (val.length < 1)
            return 'Pick 1 fruit at least'
        return true
    },
    bio: (val) => {
        if (! val.includes('hello'))
            return 'Your personal bio must include the world "hello"'
        return true
    },
    languages: (val) => {
        // val is an array of programming languages
        if (val.length < 2)
            return 'You should now at least two languages'
        if (!val.includes('java') && !val.includes('c++'))
            return 'You must know Java or C++ to apply to this position'
        return true
    },
}
```

That function shall have one parameter, which  is  the  field  value  from  user
input. The function shall return `true` if `value` is valid, `false` if  `value`
is invalid, or an arbitrary string if `value` is invalid and the returned string
should be displayed as an error.

#### Validation on input

If set to `true`, whenever user inputs something into an a field, the validation
rule for that field will be run. If the validation rule retuns `true`, it  won't
do anything because the input value is valid. If  the  validation  rule  returns
`false`, it will show the  error  message  for  that  field,  specified  by  the
`errors` property. If the validation rule returns a string, that string will  be
show as error. If no validation rule exists, nothing will be done.
 
#### Validation on submit

If set to `true`, whenever user submits the form, the validation rules for all
fields will be run. If all validation rules pass, then `VueFormBuilder` will
emit an `submit` event whose payload looks like the following:

```javascript
{
    name: 'Joe',
    email: 'joe@example.com',
    fruits: ['apple', 'orange', 'banana'],
    agreeWithTerms: true,
    file: '<FileObject>'
}
```

The programmer will be able to access just as any other Vue event:

```html
<template>
    <div>
        <h1>LOGIN INTO YOUT ACCOUNT</h1>
        <vue-form-builder :fields="fields" @submit="login" />
    </div>
</template>
<script>
export default {
    methods: {
        login(data) {
            const url = 'http://localhost:8080/api/login'
            axios.post(url, data).then(() => {
                // something...
            }).catch(e => {
                // something...
            })
        }
    }
}
</script>
```

## Contributions

Contributions are welcome. Fork the repo, then make a PR.