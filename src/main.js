import VueFormBuilder from './components/VueFormBuilder.vue'
import VfbButtons from './components/VfbButtons.vue'
import VfbSelect from './components/VfbSelect.vue'
import VfbGroup from './components/VfbGroup.vue'

function install(Vue) {
    Vue.component('vfb-buttons', VfbButtons)
    Vue.component('vfb-select', VfbSelect)
    Vue.component('vfb-group', VfbGroup)
    Vue.component('vfb', VueFormBuilder)
    Vue.component('vue-form-builder', VueFormBuilder)
}

export { VfbButtons, VfbGroup, VueFormBuilder, install as default }