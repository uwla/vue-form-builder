import { deepCopy } from '../src/helpers'
import { fields, model, veryCustomizedFields,  wrapper } from './common'

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

test('it passes model to components', async () => {
    // make the first field request the model
    veryCustomizedFields[0].model = true

    // reset the fields
    await wrapper.setProps({ fields: deepCopy(veryCustomizedFields) })

    // get the vue component
    let component1 = wrapper.findAll('.custom-field').at(0)
    let component2 = wrapper.findAll('.custom-field').at(1)

    // test with empty model
    await wrapper.setProps({ model: {} })
    expect(component1.vm.$props.model).toMatchObject({})
    expect(component2.vm.$props.model).toBeUndefined()

    // test model
    await wrapper.setProps({ model: model })
    expect(component1.vm.$props.model).toMatchObject(model)
    expect(component2.vm.$props.model).toBeUndefined()

    // make the second component request the model
    veryCustomizedFields[1].model = true
    await wrapper.setProps({ fields: deepCopy(veryCustomizedFields) })
    expect(component2.vm.$props.model).toMatchObject(model)
})

test('it passes values to components', async () => {
    let formFields = [...veryCustomizedFields, ...fields]

    // make the first field request the values
    formFields[0].values = true

    // reset the fields
    await wrapper.setProps({ fields: deepCopy(formFields) })

    // some helpers
    async function simulateInput() {
        await wrapper.find('[name=name]').setValue('joe doe')
        await wrapper.find('[name=bio]').setValue('Hi there')
        await wrapper.find('[name=agree]').setChecked(false)
        wrapper.findAll('[name=fruits]').wrappers.forEach(async x => {
            await x.setChecked(true)
        })
        wrapper.findAll('[name=languages] option').wrappers.forEach(async x => {
            await x.setSelected(true)
        })
    }

    function getValues() {
        let values = {}
        wrapper.vm.fieldsParsed.forEach(f => {
            if (f.name)
                values[f.name] = f.value
        });
        return values
    }

    // get the vue component
    let component1 = wrapper.findAll('.custom-field').at(0)
    let component2 = wrapper.findAll('.custom-field').at(1)

    // test it does pass the values
    await simulateInput()
    expect(component1.vm.$props.values).toMatchObject(getValues())
    expect(component2.vm.$props.values).toBeUndefined()

    // make the second component request the model
    formFields[1].values = true
    await wrapper.setProps({ fields: deepCopy(formFields) })

    // trigger input
    await simulateInput()
    expect(component2.vm.$props.values).toMatchObject(getValues())
})

// undo the change on the internal state of the wrapper
wrapper.setProps({ fields })