# CHANGELOG

## Vue3 releases

### v1.0.1

- fix: package not built as module, which generate wrong output files

### v1.0.0

- feat: vue3 support
- feat: v-model support
- feat: add range form field
- feat: Vuetify integration
- feat: Primevue integration
- feat: typescript type declarations
- feat: all features from vue2 version included

## Vue2 releases

## v0.2.1

- feat: add option to omit null values upon form submission
- feat: automatically convert submit event payload to FormData if has files
- feat: allow user-provided components to read current values of other fields
- feat: emit form reset event

## v0.1.1

- css: improve styles of single-checkbox fields

## v0.1.0

- break: refactor legacy code, change plugin interface, add several features
- feat: more built-in field components
- feat: adds install function to register all built-in components
- feat: integration with Bootstrap Vue
- feat: display success/error feedback messages
- feat: compatibility with the Laravel error API
- feat: option to clear feedback messages on user input
- feat: validate upon user input or upon form submission
- feat: validate field values using custom javascript functions
- and all features from legacy code

## Vue2 legacy releases

### v3.0.0 (legacy)

- break: api changes related to model and error messages
- break: `model` must be simple data object, not an instance of `Model` anymore
- break: errors are passed as props, no longer computed from `Model` object instance
- feat: more flexible, extensible api to display error messages

### v2.0.0 (legacy)

- break: `Form` class replaced by enhanced `Model` class
- css: use scoped styles to avoid conflict
- feat: allows using empty model

### v1.0.0 (legacy)

- break: api changes
- feat: allows overriding CSS classes
- feat: provide optional Form class to facilitate server requests and error handling

### v0.3.2 (legacy)

- feat: add error components (single error message or error list)
- css: overall improvements
- fix: select field component did not work with multiple options
- fix: incompatible library API, applied adapter pattern workaround

### v0.2.0 (legacy)

- feat: field aliases to easily reuse common field rules

### v0.1.0 (legacy)

- feat: add built-in components (input, checkbox, select, checkboxes, files, textarea, radio)
- feat: automatic labeling of fields, if not provided, as Title Case of field name
- feat: built-in form buttons using Bootstrap
- feat: compatibility with popular v-form library
- feat: support for custom wrapper component
