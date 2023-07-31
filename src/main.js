import VueFormBuilder from './components/VueFormBuilder.vue'
import VfbCheckboxes from './components/VfbCheckboxes.vue'
import VfbCheckbox from './components/VfbCheckbox.vue'
import VfbTextarea from './components/VfbTextarea.vue'
import VfbButtons from './components/VfbButtons.vue'
import VfbSelect from './components/VfbSelect.vue'
import VfbGroup from './components/VfbGroup.vue'
import VfbInput from './components/VfbInput.vue'
import VfbFile from './components/VfbFile.vue'

function install(Vue) {
    Vue.component('vfb-checkboxes', VfbCheckboxes)
    Vue.component('vfb-checkbox', VfbCheckbox)
    Vue.component('vfb-textarea', VfbTextarea)
    Vue.component('vfb-buttons', VfbButtons)
    Vue.component('vfb-select', VfbSelect)
    Vue.component('vfb-group', VfbGroup)
    Vue.component('vfb-input', VfbInput)
    Vue.component('vfb-file', VfbFile)
    Vue.component('vfb', VueFormBuilder)
    Vue.component('vue-form-builder', VueFormBuilder)
}

export {
    VfbFile,
    VfbGroup,
    VfbInput,
    VfbSelect,
    VfbButtons,
    VfbCheckbox,
    VfbCheckboxes,
    VueFormBuilder,
    install as default,
}
