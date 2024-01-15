# VUE FORM BUILDER

`VueFormBuilder` is a Vue  plugin that automatically generates  beautiful  forms
from declarative rules.

1. [Features](#features)
2. [Demo](#demo)
3. [Example](#example)
4. [Installation](#installation)
5. [Configuration](#configuration)
    - [Properties](#props)
    - [Fields](#fields)
    - [Syntax](#syntax)
    - [Aliases](#aliases)
    - [UI Frameworks integration](#integration-with-ui-frameworks)
    - [Component Providers](#providers)
    - [Custom components](#custom-components)
    - [Defaults](#defaults)
    - [Model](#model)
    - [Feedback](#feedback)
    - [Validation](#validation)
    - [Events](#events)
6. [Roadmap](#roadmap)
7. [Contributing](#contributing)
8. [License](#license)

## FEATURES

- concise syntax for fast development
- support for custom components
- aliases for reusing common rules
- can prefill the form with given model
- can set default field values (useful in form reset)
- support for UI frameworks (Vuetify, Primevue, BootstrapVue, and more)
- shows error messages (compatible with Laravel API)
- shows success messages
- validates fields when user enters input
- validates form upon submission
- user-defined validation rules
- custom Vue components
- support for Vue2 and Vue3

## DEMO

A demo app for `Vue3` is available in the GitHub Pages of this package:
[uwla.github.io/vue-form-builder/demo](https://uwla.github.io/vue-form-builder/demo).

There is also another demo, but for `Vue2`, available on CodeSandbox:

- [live demo](https://4rxmw4.csb.app/)
- [live demo and code](https://codesandbox.io/s/vue-form-builder-demo-4rxmw4)
- [code](https://github.com/uwla/vue-form-builder-demo)

The demo for `Vue2` (built with an earlier version of this plugin) can also be
replicated in `Vue3` with the latest versions of this plugin. So, both demos are
worth playing with.

## EXAMPLE

SImple example:

```javascript
const fields = [
    'name:name|label:Nome|text',
    'name:e-mail|email',
    'name:photo|label:Profile picture|multiple|file',
    'name:bio|textarea',
    'name:gender|options:male,female',
    'name:birthday|input|type=date',
    'name:fruits|label:Pick fruits|checkboxes|options:apple,banana,orange,avocado',
    'name:agree|checkbox|label:Agree to terms and conditions',
    'component:vfb-buttons|class=right|submitText=SALVAR|label:none',
]
```

Which generates the following HTML:

```html
<form>
    <div class="vfb-group">
        <label for="VFB5403525774">Nome</label>
        <input class="vfb-input" type="text" name="name" id="VFB5403525774" />
    </div>
    <div class="vfb-group">
        <label for="VFB6006665634">Email</label>
        <input class="vfb-input" type="email" name="e-mail" id="VFB6006665634" />
    </div>
    <div class="vfb-group">
        <label for="VFB3533685551">Profile picture</label>
        <input type="file" multiple="multiple" class="vfb-input" name="photo" id="VFB3533685551" />
    </div>
    <div class="vfb-group">
        <label for="VFB8863682902">Bio</label>
        <textarea class="vfb-textarea" name="bio" id="VFB8863682902">
        </textarea>
    </div>
    <div class="vfb-group">
        <label for="VFB3862635914">Gender</label>
        <select class="vfb-select" name="gender" id="VFB3862635914">
            <option value="male">male</option>
            <option value="female">female</option>
        </select>
    </div>
    <div class="vfb-group">
        <label for="VFB9638368444">Birthday</label>
        <input class="vfb-input" type="date" name="birthday" id="VFB9638368444" />
    </div>
    <div class="vfb-group">
        <label for="VFB3283836544">Pick fruits</label>
        <ul class="vfb-checkboxes">
            <li>
                <input type="checkbox" name="fruits" id="VFB3283836544_0" class="vfb-checkbox" value="apple" />
                <label for="VFB3283836544_0">apple</label>
            </li>
            <li>
                <input type="checkbox" name="fruits" id="VFB3283836544_1" class="vfb-checkbox" value="banana" />
                <label for="VFB3283836544_1">banana</label>
            </li>
            <li>
                <input type="checkbox" name="fruits" id="VFB3283836544_2" class="vfb-checkbox" value="orange" />
                <label for="VFB3283836544_2">orange</label>
            </li>
            <li>
                <input type="checkbox" name="fruits" id="VFB3283836544_3" class="vfb-checkbox" value="avocado" />
                <label for="VFB3283836544_3">avocado</label>
            </li>
        </ul>
    </div>
    <div class="vfb-group vfb-group-checkbox">
        <label for="VFB6242754745">Agree to terms and conditions</label>
        <input type="checkbox" class="vfb-checkbox" name="agree" id="VFB6242754745" />
    </div>
    <div class="vfb-group">
        <div class="vfb-buttons right">
            <button type="reset" class="btn btn-danger">CANCEL</button>
            <button type="submit" class="btn btn-success">SALVAR</button>
        </div>
    </div>
</form>
```

## INSTALLATION

Install via NPM:

```shell
npm install @uwlajs/vue-form-builder
```

Import VueFormBuilder, which will register all components.

```javascript
import VueFormBuilder from '@uwlajs/vue-form-builder'

const app = createApp(App)
app.use(VueFormBuilder)
```

If you do not want to use `VueFormBuilder` components and, instead, want to  use
external components (such as UI framework components), you just have  to  import
the main `VueFormBuilder` component:

```javascript
import { VueFormBuilder } from '@uwlajs/vue-form-builder'
app.component('vue-form-builder', VueFormBuilder)
```

But if you do so, you **need** to use another [component  provider](#providers).

### CSS

If you want to use `VFB` components, you need to import the CSS:

```javascript
import '@uwlajs/vue-form-builder/dist/VueFormBuilder.css'
```

## CONFIGURATION

### Props

The only required property is `fields`.

| name                 | type    | default | description                                             |
| -------------------- | ------- | ------- | ------------------------------------------------------- |
| clearFeedbackOnInput | Boolean | `true`  | Whether to clear feedback on user input.                |
| errors               | Object  | `{}`    | An object with errors to show below each field.         |
| defaults             | Object  | `{}`    | An object with default values for the fields.           |
| fields               | Array   | -       | An array describing how to render the fields.           |
| messages             | Object  | `{}`    | An object with feedback to show below each field.       |
| modelValue           | Object  | `null`  | The model to be synced with the field values.           |
| omitNull             | Boolean | `false` | Whether to omit null values in submit event's payload   |
| provider             | String  | `vfb`   | provider which defines default components for fields    |
| validateOnSubmit     | Boolean | `true`  | Whether to validate the form upon submission.           |
| validateOnInput      | Boolean | `true`  | Whether to validate fields upon user input.             |
| validation           | Object  | `{}`    | An object with the validation rules.                    |
| wrapper              | String  | `null`  | Default field wrapper component.                        |

### Fields

Each field has the following attributes:

| name         | type               | default       |  description                                                                     |
| ------------ | ------------------ | ------------- |  ------------------------------------------------------------------------------- |
| name         | `String`           | -             |  Name of the field                                                               |
| component    | `String`, `Object` | dynamic       |  Vue Component that renders the field.                                           |
| label        | `String`           | dynamic       |  Label to be displayed by the wrapper.                                           |
| model        | `Boolean`          | `false`       |  Whether to pass `modelValue` as a prop to the field component                   |
| props        | `Object`           | dynamic       |  Properties for the field component (both Vue props and HTML attributes)         |
| propsWrapper | `Object`           | dynamic       |  Properties for the field wrapper component (both Vue props and HTML attributes) |
| type         | `String`           | dynamic       |  Field type, used to determine which Vue Component to use (if not specified)     |
| values       | `Boolean`          | `false`       |  Whether to pass the current form values as a prop to the field component        |
| wrapper      | `String`, `Object` | `vfb-wrapper` |  Vue Component wrapping the field.                                               |

Most attributes are optional under certain conditions and required under others.
If `component` is specified, then `name` is optional. Otherwise, it is required.

Some fields do not have a default value, because their default value is dynamic:
it depends on the values of other attributes. For example, if `type` is  `file`,
then `component` will be `vfb-file` (if `provider` is `vfb`).

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

If `model` is set to true, the `modelValue` prop passed to `VueFormBuilder` will
also be passed as prop to the field's Vue component. This useful if you  have  a
custom component that needs to access some of the model's values.

If `values` is set to true, the current form values will be passed as a prop  to
the field's Vue component. This useful if you  have  a  custom  component  whose
content depends on the values of other fields, dynamically changing according to
the user input.

### Syntax

You can declare fields either as objects or strings. For string declarations, we
use a string notation that consists of the following rules:

- The string is made of attributes separated by the symbol `|`.
- There are four attribute types:
1. The first attribute type has the format `key:value`.
2. The second attribute has the format `key=value`.
3. The third attribute type is syntax sugar for  the  first  type  and  has  the
   format `value`. For  example:  instead  of  `type:checkboxes`  you  just  use
   `checkboxes`.
4. The fourth attribute type is syntax sugar for the second  type  and  has  the
   format  `value`.  For  example:  instead  of  `required=true`  you  just  use
   `required`.

#### First type

The first attribute type were described in the previous section.

#### Second type

The second attribute type is arbitrary in order to provide flexibility  to  pass
props to custom components. The attributes are cast: string numbers are cast  to
numbers, and `true` and `false` are cast to boolean.

It is important to notice that if the Vue component used  to  render  the  field
does not explicitly declare a prop, then Vue will render  the  attribute  as  an
HTML attribute. For example, `class=red` will make Vue apply the class `red`  to
the component if it does not declare a prop  called  `class`.  Another  example:
setting `rows=10` to a textarea component will make Vue apply `rows="10"` to the
textarea element if the component does not declare a prop called `red`.

#### Third type

The third attribute type supports the following values: 

- **input  types**:  `color`,  `date`,  `datetime`,  `datetime-local`,  `email`,
`month`, `number`, `password`, `range`, `tel`, `text`, `time`, `url`, `week`.
- **field types**:  `checkbox`,  `checkboxes`,  `datapicker`,  `file`,  `input`,
`radio`, `select`, `tags`, `textarea`, `timepicker`.

The `input types`  are  syntax  sugar  for  `type:input|type=<attribute>`, where
`<attribute>` is color, date, etc.

The `field types` are syntax sugar for `type:<attribute>`,  where  `<attribute>`
is checkbox, file, etc.

#### Fourth type

The  fourth  attribute  types  supports  the  following   values:   `autofocus`,
`multiple`, `disabled`, `hidden`, `required`, `readonly`, `stacked`, `switches`.
It is syntax sugar for `attribute=true`, where attribute is one of the  previous
value.

#### Object notation

Instead of using string notation, you can provide objects:

```javascript
fields = [
  { name: 'name', type: 'text', props: { min: 3, max: 30, required: true} },
  { name: 'email', type: 'email', label: 'Email address', props: { required: true } },
  { name: 'password', type: 'password', props: { min: 10, required: true } },
  { name: 'photo', type: 'file', props: { accept: 'image/*' } },
  { name: 'info', type: 'textarea', props: { rows: 10 } },
]
```

The accepted attributes for the object field were already described previously.

### Aliases

Field aliases are single words used as an alias to a field declaration. They
make it easy to reuse field declarations across instances of `VueFormBuilder`.
The default aliases are:

```javascript
{
    name: 'name:name|text',
    fname: 'name:fname|text|label:First name',
    lname: 'name:lname|text|label:Last name',
    username: 'name:username|text',
    email: 'name:email|email',
    email_confirmation: 'name:email_confirmation|email',
    password: 'name:password|password',
    password_confirmation: 'name:password_confirmation|password',
    age: 'name:age|number',
    birthday: 'name:birthday|date',
    photo: 'name:photo|file|accept=image/*',
    picture: 'name:picture|file|accept=image/*',
    profile_picture: 'name:profile_picture|file|accept=image/*'
}
```

Thus, the following field declarations are equivalent:

```javascript
// using alias
fields = ['name', 'email', 'password', 'age', 'photo']

// using string notation
fields = [ 
    'name:name|text',
    'name:email|email',
    'name:password|password',
    'name:age|number',
    'name:photo|file|accept=image/*',
 ]

 // using object notation
 fields = [
    { name: 'name', type: 'text' },
    { name: 'email', type: 'email' },
    { name: 'password', type: 'password' },
    { name: 'age', type: 'number' },
    { name: 'photo', type: 'file', props: { accept: 'image/*' } },
 ]
```

Aliases are available to all instances of `VueFormBuilder`. The facade to handle
aliases is `fieldAliases`:

```javascript
import fieldAliases from '@uwlajs/vue-form-builder'
```

The `fieldAliases` provides the following methods

| method                          | description                             |
| ------------------------------- | --------------------------------------- |
| `addAliases(newAliases)`        | Add multiple aliases at once            |
| `addAlias(key, value)`          | Add single alias                        |
| `delAliases(keys)`              | Delete existing aliases                 |
| `delAlias(key)`                 | Delete existing alias                   |
| `delAllAliases()`               | Delete all existing aliases             |
| `getAliases(keys)`              | Get the values of several aliases       |
| `getAlias(key)`                 | Get the value of an alias               |
| `getAllAliases()`               | Get all the available aliases           |
| `isAlias(key)`                  | Check if alias exists (returns boolean) |
| `setAliases(newAliases)`        | Replace existing aliases with new ones  |
| `setAlias(key, newValue)`       | Replace existing alias with new one     |

Where:

- `key`: string, the alias itself
- `keys`: array of strings, the aliases
- `value`, `newValue`: string or object, the alias value
- `newAlias`: object whose `keys` are aliases and whose values are the  aliases'
values.

### Integration with UI frameworks

Integration with UI frameworks is possible by setting the `provider` prop to the
desired framework. The default `provider` is `vfb`, which uses `VueFormBuilder`
components.

You can integrate `VueFormBuilder` with **any** framework by making use  of  the
[ProviderService](#providers).

Example:

```vue
<!-- default provider -->
<vue-form-builder :fields="fields" />

<!-- vuetify provider -->
<vue-form-builder :fields="fields" provider="vuetify" />

<!-- primevue provider -->
<vue-form-builder :fields="fields" provider="vuetify" />
```

Currently, there is partial  support  for  `Primevue`  and  `Vuetify`.  That  is
because some of their form components are not compatible with the  API  expected
by `VueFormBuilder`.

One solution is for the developer to implement the *Adapter Pattern*: write  Vue
components that wrap `Primevue` or `Vuetify` form components and,  at  the  same
time, expose an API compatible with `VueFormBuilder`:

```vue
<template>
    <v-radio-group :modelValue="val" @update:modelValue="handleInput" >
        <v-radio v-for="radio in options" :key="radio.value"
            :label="radio.text"
            :value="radio.value"
            />
    </v-radio-group>
</template>
<script type="ts">
import { defineComponent } from "vue"

export default defineComponent({
    data: () => {
        return {
            val: this.modelValue
        }
    },
    methods: {
        handleInput() {
            this.$emit('update:modelValue', this.val)
        }
    },
    props: ['modelValue', 'options']
})
</script>
```

Another solution is to manually define components, which  is  explained  in  the
[custom components section](#custom-components).

`VueFormBuilder` has full support for  `BootstrapVue`  in  its  prior  versions,
which are versions that work with `Vue2`. But,  because  `BootstrapVue`  has  no
support for `Vue3`, the versions of `VueFormBuilder` that work  with  `Vue3`  do
not have support for `BootstrapVue`.

### Providers

A provider is basically a dictionary mapping field types to Vue components.

An example:

```typescript
const VfbProvider : ComponentProvider = {
    checkboxes: 'vfb-checkboxes',
    checkbox: 'vfb-checkbox',
    feedbackInvalid: 'vfb-feedback-invalid',
    feedbackValid: 'vfb-feedback-valid',
    file: 'vfb-file',
    form: 'form',
    input: 'vfb-input',
    radio: 'vfb-radio',
    range: 'vfb-range',
    select: 'vfb-select',
    textarea: 'vfb-textarea',
    wrapper: 'vfb-group',
}
```

Valid   field   types   are:   `checkboxes`,   `checkbox`,    `feedbackInvalid`,
`feedbackValid`,  `file`,   `form`,   `input`,   `radio`,   `range`,   `select`,
`textarea`, and `wrapper`.

The values are the name of the `Vue` components, not the components  themselves.
The reason behind this is to avoid overhead and performance  issue:  `Vue`  give
some warning about setting a `Vue` component as a reactive property  of  another
component.

These components will be rendered as the default components for the form fields.
Of course, you can override the component on a per-field basis, as explained  in
the [custom components section](#custom-components).

You can add custom providers as follows:

```javascript
import { ProviderService } from 'uwlajs/vue-form-builder'

ProviderService.addProvider('myProvider', {
    'input': 'CustomInput',
    'form': 'CustomForm',
    'textarea': 'CustomArea',
    'wrapper': 'CustomFieldWrapper',
    // and more ...
})
```

Then, use it:

```vue
<vue-form-builder :fields="fields" provider="myProvider" />
```

The `ProviderService` has the following API:

| method                                | description                     |
| :-----------------------------------: | :-----------------------------: |
| `addProvider(providerName, provider)` | add new provider                |
| `delProvider(providerName)`           | delete existing provider        |
| `getProvider(providerName)`           | get the provider                |
| `hasProvider(providerName)`           | check if provider is registered |
| `setProvider(providerName, provider)` | override existing provider      |

### Custom components

#### Custom field component

You can set custom components for rendering fields like so:

```javascript
// option 1
field = 'name:lang|label:Favorite languages|component:multiselect|options:js,c,c++,go,php|track-by=value|label=text|multiple',

// option 2 (equivalent to option 1)
field = {
    component: 'multiselect',
    label: 'Favorite language',
    name: 'lang',
    props: {
        'track-by': 'value',
        'label': 'text',
        'multiple': true,
        'options': [
            { value: 'js', text: 'js' },
            { value: 'c', text: 'c' },
            { value: 'c++', text: 'c++' },
            { value: 'go', text: 'go' },
            { value: 'php', text: 'php' },
        ]
    }
}
```

In the example above, we are using [Vue Multiselect Plugin](https://vue-multiselect.js.org/).
You can use any component you want, including the ones yourself wrote.

#### Component CSS ID

An important point is that,  by  default,  `VueFormBuilder`  will  add  an  `id`
attribute to `props`, which is a random string designed to be a unique  CSS  id.
If the `component` does not explicitly have a property  called  `id`,  then  Vue
will understand this is actually an HTML attribute and will set `id` as the  CSS
id of `component`. Otherwise, if the component has a property called `id`,  then
Vue won't automatically set it as an HTML attribute. If `props.id`  is  defined,
then `VueFormBuilder` won't generated an `id`.

```javascript
// explicitly setting a CSS id
field = 'name:email|id=email_address|type:email'

// same thing, but in Object notation
field = {
    name: 'email',
    type: 'email',
    props: {
        id: 'email_address',
    }
}
```

Whatever the value of `id` is, it will be passed to the field wrapper  component
by default, so that the label is uniquely associated with the field.

```html
<div class="vfb-group">
    <input name="email" id="email_address" type="email" />
    <label for="email_address">Email</label>
</div>
```

#### Custom wrapper

A wrapper is a container that wraps the field. It is useful for showing labels
next to the input field, or to show additional information.

`VueFormBuilder` assumes the `wrapper` is a Vue  component  with  at  least  two
props: `label` and `labelFor`. So, if you are using a  custom  wrapper  yourself
wrote, make sure to declare those properties, even if  you  don't  plan  to  use
these values. Otherwise, Vue will set `label` and `labelFor` as HTML attributes,
visible in the browser devtools.

```html
<template>
    <div class="custom-wrapper">
        <slot></slot>
        <label :for="labelFor">{{ label }}</label>
    </div>
</template>
<script>
export default {
    props: ['label', 'labelFor', 'foo', 'bar']
}
</script>
```

Then, to use this wrapper in an individual field:

```javascript
Vue.component('my-custom-wrapper', CustomWrapper)

// string notation
field = 'name:foo|text|wrapper:my-custom-wrapper'

// object notation
field = {
    name: 'foo',
    type: 'text',
    wrapper: 'my-custom-wrapper',
}
```

To use your wrapper component as the default wrapper component, pass it as the
`wrapper` property to `VueFormBuilder`:

```html
<vue-form-builder :fields="fields" wrapper='my-custom-wrapper' />
```

You can set a `div` as field wrapper. That way,  it  won't  show  anything  else
besides the `field` component.

```javascript
// explicitly setting the wrapper component
field = 'name:email|email|wrapper:div'

// same thing, but in Object notation
field = {
    name: 'email',
    type: 'email',
    wrapper: 'div',
}
```

#### Component label

In the previous example, it is recommend to set `label` to `none` because
`VueFormBuilder` will pass the `label` and `labelFor` as properties, which  Vue
will  render  as HTML attributes. So:

```javascript
// explicitly setting the wrapper component
field = 'name:email|email|wrapper:div|label:none'

// same thing, but in Object notation
field = {
    name: 'email',
    type: 'email',
    label: 'none',
    wrapper: 'div',
}
```

Moreover, if you explicitly set `propsWrapper`, then `label` won't be added by
`VueFormBuilder` by default:

```javascript
field = {
    name: 'email_address',
    type: 'email',
    wrapper: 'custom-wrapper',
    propsWrapper: { 'foo': 1, 'bar:': 2 }
}
```

In that case, you would have to manually pass the label to the wrapper.

### Defaults

To fill out the form with predefined values by setting the `defaults` prop:

```javascript
defaults = {
    name: 'Joe Doe',
    email: 'joe@example.test',
    job: 'Software Engineer',
    roles: ['user', 'staff'],
}
```

This will set the initial values of the fields whose name match the keys of  the
objects. If the user resets the form, the field values will  fall  back  to  the
values in `defaults`.

### Model

You can use `v-model` to set default for field values and have two-way binding.
Here is how the `modelValue` should look like:

```javascript
modelValue = {
    name: 'Joe Doe',
    email: 'joe@example.test',
    job: 'Software Engineer',
    roles: ['user', 'staff'],
}
```

This will set the initial values of the fields whose name match the keys of  the
objects. It overwrites the `defaults` property.  Moreover,  it  syncs  with  the
field values as the user enters input.

### Feedback

Feedback components are used to display helpful messages, such as error  message
or  successful  messages.  The  default  component  used  to  show  feedback  is
`vfb-feedback`, but you can customize it:

```javascript
// string notation
field = 'name:photo|file|componentFeedback:custom-feedback'

// object notation
field = {
    name: 'photo',
    type: 'file',
    props: { componentFeedback: 'custom-feedback' }
}
```

For that matter, the feedback component should abide to the following interface:

```javascript
props: {
    state: {
        default: null,
        type: Boolean,
    },
    errors: [String, Array],
    message: String,
    invalidFeedbackComponent: [String, Object],
    validFeedbackComponent: [String, Object],
}
```

The feedback component should declare the properties defined above,  with  their
respective types. Otherwise, `VueFormBuilder` won't be  able  to  pass  relevant
information to be display  as  feedback.  In  practice,  you  can  design  those
components as you wish, though it may lack the intended functionality.

The `invalidFeedbackComponent` is used  to  render  error  messages,  while  the
`validFeedbackComponent` is used to show success messages. Both of  them  should
have a boolean prop called `state`. If `state` is  `false`,  then  the  feedback
should display errors. If `state`, then  the  feedback  should  display  success
messages.

#### Errors

The error is an array mapping field names to strings or arrays of strings.

```javascript
errors: {
    name: [
        'Name too long.',
        'Name cannot contain special characters.'
    ],
    email: [
        'Email must be a valid email.',
    ],
    photo: [
        'Photo cannot exceed 2MB.',
        'Photo has invalid dimensions.',
        'Supported formats are PNG or JPG.',
    ]
}
```

If set, it will display those  errors  below  the  corresponding  fields,  whose
`name` matches the key in the `errors` object. It is useful if when the  backend
returns errors and you want to show them:

```html
<template>
    <div>
        <h1>Add Post</h1>
        <vue-form-builder :fields="fields" :errors="errors" @submit="addPost" />
    </div>
</template>
<script>
export default {
    data() {
        return {
            fields: [
                'name:title|text',
                'name:author|text',
                'name:body|textarea|rows=15',
                'name:img|label:Cover image|file|accepts=image/jpg',
            ],
            errors: {},
        }
    },
    methods: {
        addPost(data) {
            const url = 'http://localhost:8080/api/post'
            axios.post(url, data).then(response => {
                // show some successful message..
            }).catch(exception => {
                // assuming the backend follows 'Laravel API' for erros,
                // no further parsing is needed
                this.errors = exception.response.data.errors
            })
        }
    }
}
</script>
```

#### Message

The `messages` is an object mapping a field name to a string. Example:

```javascript
messages = {
    email: 'Email is valid',
    photo: 'Looks good',
    website: 'Website URL seems to be working',
    domain: 'Domain seems to be reachable',
    info: 'All right here!',
}
```

If set, the messages are shown as valid feedback, styled  in  green  aside  with
success icons.

#### Custom feedback component

You can define a custom feedback component by setting `feedback` property  of  a
field (via string notation or JS Object) to the name of your feedback component.
`VueFormBuilder` will attempt to pass the following properties to the `feedback`
component:

- `state`: if `true`, it should display valid feedback. If  `false`,  it  should
display invalid feedback. If `null`, it should do nothing.
- `message`: string with the message to be displayed as valid feedback.
- `errors`: string or array of string with the error messages to be displayed as
invalid feedback.
- `validFeedbackComponent`: the VueJS component which is supposed to render  the
valid feedback.
- `invalidFeedbackComponent`: the VueJS component which is  supposed  to  render
the invalid feedback.

Make sure to  explicitly  declare  those  properties  in  your  custom  feedback
component, even if you may not use some of them.

### Validation

The `validation` is an object mapping a field name to a function. Example:

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
    },
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
rule for that field will be run. If the validation rule returns `true`, it won't
do anything because the input value is valid. If  the  validation  rule  returns
`false`, it will show the  error  message  for  that  field,  specified  by  the
`errors` property. If the validation rule returns a string, that string will  be
show as error. If no validation rule exists, nothing will be done.
 
#### Validation on submit

If set to `true`, whenever user submits the form, the validation rules  for  all
fields will be run. If all validation rules  pass,  then  `VueFormBuilder`  will
emit an `submit` event whose payload is described in the next section.

### Events

#### Submit

When the form is submitted and pass the validation rules (if they exist and  are
enabled), it emits an event called `submit` whose payload looks like this:

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
        <h1>LOGIN INTO YOUR ACCOUNT</h1>
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

If the payload contains a `File` or `Bob`, then the payload won't  be  `Object`:
it will be an instance of `FormData`. This is useful because in order to  upload
files via AJAX you need to convert the JS Object  into  the  `FormData`  format.
`VueFormBuilder` will automatically do it for you.

#### Reset

When the user resets the form by, for example, clicking  on  a  button  of  type
`reset`, then `VueFormBuilder` will reset all field values to match  the  values
defined by `default` or, if the corresponding value is not set,  it  will  reset
the form values to empty strings, arrays, or null.

It will also emit an event called `reset` with no payload.  This  event  can  be
used to trigger some action in your UI, such as hiding a modal dialog containing
a form built with `VueFormBuilder`.

## ROADMAP

- [x] Support for Vue3
- [ ] Support for SSR

## CONTRIBUTING

Contributions are welcome. Fork the repo, then make a PR.

## LICENSE

MIT

