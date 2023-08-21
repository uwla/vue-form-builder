import { fields, veryCustomizedFields,  wrapper } from './common'

test('it loads customized fields', async () => {
    await wrapper.setProps({
        fields: veryCustomizedFields
    })
    expect(wrapper.exists()).toBe(true)

    const fieldComponents = wrapper.findAll('.custom-field')
    const fieldFeedbacks = wrapper.findAll('.custom-feedback')
    const fieldWrappers = wrapper.findAll('.custom-wrapper')

    const n = veryCustomizedFields.length

    expect(fieldComponents).toHaveLength(n)
    expect(fieldFeedbacks).toHaveLength(n)
    expect(fieldWrappers).toHaveLength(n)
})

test('it set correct props of custom components', async () => {
    const fieldComponents = wrapper.findAll('.custom-field')
    const fieldWrappers = wrapper.findAll('.custom-wrapper')

    let i = 0
    for (let fieldObj of veryCustomizedFields)
    {
        // get the components
        let fieldComponent = fieldComponents.at(i)
        let fieldWrapper = fieldWrappers.at(i)

        // test the properties were set correctly
        expect(fieldComponent.vm.$props).toMatchObject(fieldObj.props)
        expect(fieldWrapper.vm.$props).toMatchObject(fieldObj.propsWrapper)

        // increment counter
        i += 1
    }
})

// undo the change on the internal state of the wrapper
wrapper.setProps({ fields })