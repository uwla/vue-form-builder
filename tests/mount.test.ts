import { expect, test } from 'vitest'
import { fields, mixedFields, objFields,  textFields,  wrapper } from './common'

test('it mounts', () => {
    expect(wrapper.exists()).toBe(true)
})

test('it mounts with text fields', async () => {
    await wrapper.setProps({
        fields: textFields
    })
    expect(wrapper.exists()).toBe(true)
})

test('it mounts with object fields', async () => {
    await wrapper.setProps({
        fields: objFields
    })
    expect(wrapper.exists()).toBe(true)
})

test('it mounts with mixed fields', async () => {
    await wrapper.setProps({
        fields: mixedFields
    })
    expect(wrapper.exists()).toBe(true)
})

// undo the change on the internal state of the wrapper
wrapper.setProps({ fields })
