// -----------------------------------------------------------------------------

// Dictionary: field type => VueFormBuilder component
const VfbProvider : ComponentProvider = {
    checkbox: 'vfb-checkbox',
    checkboxes: 'vfb-checkboxes',
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

// -----------------------------------------------------------------------------
// PROVIDER SERVICE

const providers : Providers = {
    'vfb': VfbProvider,
    'bootstrap-vue': BootstrapVueProvider,
}

function addProvider(name: ProviderName, provider: ComponentProvider) {
    if (! Object(providers).hasOwnProperty(name))
        providers[name] = provider
}

function delProvider(name: ProviderName) {
    delete providers[name]
}

function getProvider(name: ProviderName) {
    return providers[name]
}

function hasProvider(name: ProviderName) {
    return Object(providers).hasOwnProperty(name)
}

function setProvider(name: ProviderName, provider: ComponentProvider) {
    providers[name] = provider
}

export const ProviderService = {
    addProvider,
    delProvider,
    getProvider,
    hasProvider,
    setProvider,
}
