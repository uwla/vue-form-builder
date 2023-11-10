// ----------------------------------------------------------------------------
// COMPONENT PROVIDERS

// Dictionary: field type => VueFormBuilder component
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

// Dictionary: field type => BootstrapVue component
const BootstrapVueProvider : ComponentProvider = {
    checkbox: 'b-form-checkbox',
    checkboxes: 'b-form-checkbox-group',
    datepicker: 'b-form-datepicker',
    feedbackInvalid: 'b-form-invalid-feedback',
    feedbackValid: 'b-form-valid-feedback',
    file: 'b-form-file',
    form: 'b-form',
    input: 'b-form-input',
    radio: 'b-form-radio-group',
    range: 'b-form-input',
    select: 'b-form-select',
    tags: 'b-form-tags',
    textarea: 'b-form-textarea',
    timepicker: 'b-form-timepicker',
    wrapper: 'b-form-group',
}

// Dictionary: field type => Primevue component
//
// Primevue has more form components. See https://primevue.org/.
// But these cannot be added to the provider list because they do not match the
// API expected by VFB.
//
// If user wants to use the other Primevue form components, the developer has to
// define a custom Vue Component that wraps them and expose a compatible API.
// In summary: the developer has to implement the Adapter Pattern.
//
// Another option is to use custom components, but may be repetitive.
const PrimevueProvider : ComponentProvider = {
    checkbox: 'Checkbox',
    input: 'InputText',
    select: 'TreeSelect',
    textarea: 'Textarea',
}

// Dictionary: field type => Vuetify component
//
// Vuetify has more form components. See https://vuetifyjs.com/en/components/.
// But these cannot be added to the provider list because they do not match the
// API expected by VFB.
//
// If user wants to use the other Vuetify form components, the developer has to
// define a custom Vue Component that wraps them and expose a compatible API.
// In summary: the developer has to implement the Adapter Pattern.
//
// Another option is to use custom components, but may be repetitive.
const VuetifyProvider : ComponentProvider = {
    checkbox: 'v-checkbox',
    file: 'v-file-input',
    form: 'v-form',
    input: 'v-text-field',
    range: 'v-slider',
    select: 'v-select',
    textarea: 'v-textarea',
}

// ----------------------------------------------------------------------------

// Some providers do not have Vue components for every field type.
//
// For example, Vuetify and Primevue do not define a wrapper component that
// would wrap a form field and display a label.
//
// Therefore, we need to add the missing components to these providers.

type CP = ComponentProvider;
function addMissingComponentsToProvider(source: CP, target: CP) {
    // Copy components from source to target if they are not present in target.
    for (let fieldType of Object.keys(source)) {
        if (! Object(target).hasOwnProperty(fieldType)) {
            target[fieldType] = source[fieldType]
        }
    }
}

addMissingComponentsToProvider(VfbProvider, PrimevueProvider)
addMissingComponentsToProvider(VfbProvider, VuetifyProvider)

// ----------------------------------------------------------------------------

// export the providers
export {
    BootstrapVueProvider,
    PrimevueProvider,
    VfbProvider,
    VuetifyProvider,
}
