import { mount } from '@vue/test-utils'
import Vue from 'vue'
import { default as install, VueFormBuilder } from '../src/main'

Vue.use(install)

const wrapper = mount(VueFormBuilder, {
    propsData: {
        fields: [],
    }
})

test('it mounts', () => {
    expect(wrapper).toBeTruthy()
})


