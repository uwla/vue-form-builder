import VfbFeedbackInvalid from './components/VfbFeedbackInvalid.vue'
import VfbFeedbackValid from './components/VfbFeedbackValid.vue'
import VueFormBuilder from './components/VueFormBuilder.vue'
import VfbCheckboxes from './components/VfbCheckboxes.vue'
import VfbCheckbox from './components/VfbCheckbox.vue'
import VfbTextarea from './components/VfbTextarea.vue'
import VfbFeedback from './components/VfbFeedback.vue'
import VfbButtons from './components/VfbButtons.vue'
import VfbSelect from './components/VfbSelect.vue'
import VfbGroup from './components/VfbGroup.vue'
import VfbInput from './components/VfbInput.vue'
import VfbRadio from './components/VfbRadio.vue'
import VfbRange from './components/VfbRange.vue'
import VfbFile from './components/VfbFile.vue'
import fieldAliases from './aliases'

const components : { [key: string] : any } = {
    // vue form builder components
    'vfb-feedback-invalid': VfbFeedbackInvalid,
    'vfb-feedback-valid': VfbFeedbackValid,
    'vfb-checkboxes': VfbCheckboxes,
    'vfb-checkbox': VfbCheckbox,
    'vfb-textarea': VfbTextarea,
    'vfb-feedback': VfbFeedback,
    'vfb-buttons': VfbButtons,
    'vfb-select': VfbSelect,
    'vfb-group': VfbGroup,
    'vfb-input': VfbInput,
    'vfb-radio': VfbRadio,
    'vfb-range': VfbRange,
    'vfb-file': VfbFile,

    // vue form builder
    'vfb': VueFormBuilder,
    'vue-form-builder': VueFormBuilder,
}

function install(app: any) {
    for (let componentName in components)
        app.component(componentName, components[componentName])
}

const plugin = { install }

export default plugin
export {
    components,
    fieldAliases,
    plugin,
    install,
    VueFormBuilder,
}