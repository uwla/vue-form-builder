import { mount } from '@vue/test-utils'
import Vue from 'vue'
import { default as install, VueFormBuilder } from '../src/main'

Vue.use(install)

const wrapper = mount(VueFormBuilder, {
    propsData: {
        fields: [
            'name:email|email|label:Email address',
        ],
    }
})

test('it mounts', () => {
    expect(wrapper).toBeTruthy()
})

test('it renders fields', () => {
    const label = wrapper.find('label')
    expect(label.text()).toBe('Email address')
})

// utils test
// parser test
// label text
// input type
// textarea
// checkbox
// checkboxes
// select
// radio
// reset form
// custom component
// messages
// validation
// errors