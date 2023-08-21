import { toTitleCase } from '../src/helpers'
import { fields, wrapper } from './common'


test('it renders labels', () => {
    // get the label text from the fields
    const labelText = fields.map(f => {
        // label is explicitly defined
        let match = f.match(/label:([^|]+)/)
        if (match) return match[1]

        // label is guessed by the field name
        match = f.match(/name:([^|]+)/)
        if (match) return toTitleCase(match[1])

        // else, return null, which will be filtered later
        return null
    }).filter(label => label && label != 'none')

    // the label components
    const labels = wrapper.findAll('.vfb-group > label')

    // check length
    expect(labels).toHaveLength(labelText.length)
    
    // check text
    for (let i = 0; i < labels.length; i += 1)
        expect(labels.at(i).text()).toBe(labelText[i])
})

test('it renders input with correct type attributes', () => {
    // these types are defined in the `fields` variable
    const inputTypes = [
        'text', 'email', 'tel', 'url', 'password', 'date', 'range', 'file'
    ]

    // get the input elements
    const selector = 'input:not([type=radio]):not([type=checkbox]):not([hidden])'
    const inputs = wrapper.findAll(selector)

    // check length
    expect(inputs).toHaveLength(inputTypes.length)

    // check type
    for (let i = 0; i < inputs.length; i += 1)
        expect(inputs.at(i).attributes('type')).toBe(inputTypes[i])
})

test('it renders single checkbox', () => {
    const checkbox = wrapper.find('input[name=agree]')
    expect(checkbox.exists()).toBe(true)
    expect(checkbox.attributes('type')).toBe('checkbox')
})

test('it renders textarea', () => {
    const textarea = wrapper.find('textarea') 
    expect(textarea.exists()).toBe(true)
    expect(textarea.attributes('rows')).toBe('6')
    expect(textarea.attributes('name')).toBe('bio')
})

test('it renders checkboxes', () => {
    const checkboxes = wrapper.findAll('input[name=fruits]')
    const labels = wrapper.findAll('input[name=fruits] ~ label')
    const values = ['apple', 'banana', 'orange', 'avocado']

    expect(checkboxes).toHaveLength(values.length)

    for (let i = 0; i < values.length; i += 1)
    {
        expect(labels.at(i).text()).toBe(values[i])
        expect(checkboxes.at(i).attributes('value')).toBe(values[i])
    }
})

test('it renders radio', () => {
    const radios = wrapper.findAll('input[name=country]')
    const labels = wrapper.findAll('input[name=country] ~ label')
    const values = ['United States', 'Mexico', 'Canada', 'Other']

    expect(radios).toHaveLength(values.length)

    for (let i = 0; i < values.length; i += 1)
    {
        expect(labels.at(i).text()).toBe(values[i])
        expect(radios.at(i).attributes('value')).toBe(values[i])
    }
})

test('it renders select', () => {
    // check select
    const select = wrapper.find('select')
    expect(select.exists()).toBe(true)

    // check options
    const options = select.findAll('option')
    expect(options).toHaveLength(2)

    // check options text and value
    let val = ['male', 'female']
    for (let i = 0; i < 2; i += 1)
    {
        expect(options.at(i).text()).toBe(val[i])
        expect(options.at(i).attributes('value')).toBe(val[i])
    }
})

test('it renders hidden fields', () => {
    const input = wrapper.find('input[hidden]')
    expect(input.exists()).toBe(true)
    expect(input.attributes('name')).toBe('token')
})

test('it renders custom component', () => {
    const containerButtons = wrapper.find('.vfb-buttons')
    expect(containerButtons.exists()).toBe(true)
    expect(containerButtons.find('[type=submit]').text()).toBe('SUBMIT')
    expect(containerButtons.find('[type=reset]').text()).toBe('RESET')
})