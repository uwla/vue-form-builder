import { deepCopy } from '../src/helpers'
import { fields, getValues, model, simulateUserInput, veryCustomizedFields,  wrapper } from './common'
import CustomField from './components/CustomField.vue'
import CustomFeedback from './components/CustomFeedback.vue'
import CustomWrapper from './components/CustomWrapper.vue'


test('it loads customized fields', async () => {
    await wrapper.setProps({
        fields: veryCustomizedFields
    })
    expect(wrapper.exists()).toBe(true)

    const fieldComponents = wrapper.findAllComponents(CustomField)
    const fieldFeedbacks = wrapper.findAllComponents(CustomFeedback)
    const fieldWrappers = wrapper.findAllComponents(CustomWrapper)

    const n = veryCustomizedFields.length

    expect(fieldComponents).toHaveLength(n)
    expect(fieldFeedbacks).toHaveLength(n)
    expect(fieldWrappers).toHaveLength(n)
})

test('it set correct props of custom components', async () => {
    const fieldComponents = wrapper.findAllComponents(CustomField)
    const fieldWrappers = wrapper.findAllComponents(CustomWrapper)

    let i = 0
    for (let fieldObj of veryCustomizedFields)
    {
        // get the components
        let fieldComponent = fieldComponents[i]
        let fieldWrapper = fieldWrappers[i]

        // test the properties were set correctly
        expect(fieldComponent.props()).toMatchObject(fieldObj.props)
        expect(fieldWrapper.props()).toMatchObject(fieldObj.propsWrapper)

        // increment counter
        i += 1
    }
})

test('it passes model to components', async () => {
    let fields = deepCopy(veryCustomizedFields)

    // make the first field request the model
    fields[0].model = true

    // reset the fields
    await wrapper.setProps({ fields: fields })

    // get the vue component
    let component1 = wrapper.findAllComponents(CustomField)[0]
    let component2 = wrapper.findAllComponents(CustomField)[1]

    // test with empty model
    await wrapper.setProps({ model: {} })
    expect(component1.props().model).toMatchObject({})
    expect(component2.props().model).toBeUndefined()

    // test model
    await wrapper.setProps({ model: model })
    expect(component1.props().model).toMatchObject(model)
    expect(component2.props().model).toBeUndefined()

    // make the second component request the model
    fields[1].model = true
    await wrapper.setProps({ fields: deepCopy(fields) })
    expect(component2.props().model).toMatchObject(model)
})

test('it passes values to components', async () => {
    let formFields = [...veryCustomizedFields, ...fields]

    // make the first field request the values
    formFields[0].values = true

    // reset the fields
    await wrapper.setProps({ fields: deepCopy(formFields) })

    // the input
    const input = {
        name: 'joe doe',
        bio: 'Hello, I\'m Joe',
        agree: false,
        fruits: ['avocado', 'apple'],
        languages: ['java', 'php'],
    }

    // get the vue component
    let component1 = wrapper.findAllComponents(CustomField)[0]
    let component2 = wrapper.findAllComponents(CustomField)[1]

    // test it does pass the values
    await wrapper.vm.passValuesToFieldsAsProps()
    // DEBUG: line above should be replaced by line below and test still pass
    // await simulateUserInput(wrapper, input) 

    expect(component1.props().values).toMatchObject(getValues(wrapper))
    expect(component2.props().values).toBeUndefined()

    // make the second component request the model
    formFields[1].values = true
    await wrapper.setProps({ fields: deepCopy(formFields) })

    // trigger input
    await wrapper.vm.passValuesToFieldsAsProps()
    // DEBUG: line above should be replaced by line below and test still pass
    // await simulateUserInput(wrapper, input) 
    expect(component2.props().values).toMatchObject(getValues(wrapper))
})

// undo the change on the internal state of the wrapper
wrapper.setProps({ fields })