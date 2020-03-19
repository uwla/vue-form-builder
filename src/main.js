import Vue from 'vue'
import App from './App.vue'

import FormBuilder from './components/FormBuilder.vue'

Vue.component('form-builder', FormBuilder)

Vue.config.productionTip = false

new Vue({
	render: h => h(App)
}).$mount('#app')
