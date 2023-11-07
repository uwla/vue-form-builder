import '../types'

// Dictionary: field type => VueFormBuilder component
export const VfbProvider : ComponentProvider = {
    checkbox: 'vfb-checkbox',
    checkboxes: 'vfb-checkboxes',
    feedbackInvalid: 'vfb-feedback-invalid',
    feedbackValid: 'vfb-feedback-valid',
    file: 'vfb-file',
    input: 'vfb-input',
    radio: 'vfb-radio',
    range: 'vfb-range',
    select: 'vfb-select',
    textarea: 'vfb-textarea',
    wrapper: 'vfb-group',
}

// Dictionary: field type => BootstrapVue component
export const BootstrapVueProvider : ComponentProvider = {
    checkbox: 'b-form-checkbox',
    checkboxes: 'b-form-checkbox-group',
    datepicker: 'b-form-datepicker',
    feedbackInvalid: 'b-form-invalid-feedback',
    feedbackValid: 'b-form-valid-feedback',
    file: 'b-form-file',
    input: 'b-form-input',
    radio: 'b-form-radio-group',
    range: 'b-form-input',
    select: 'b-form-select',
    tags: 'b-form-tags',
    textarea: 'b-form-textarea',
    timepicker: 'b-form-timepicker',
    wrapper: 'b-form-group',
}