import { mount } from '@vue/test-utils'
import Vue from 'vue'
import { default as install, VueFormBuilder } from '../src/main'
import { toTitleCase } from '../src/helpers'

Vue.use(install)

// ─────────────────────────────────────────────────────────────────────────────

const fields = [
    'name:name|text|min=5|max=30',
    'name:email|email',
    'name:phone|tel|label:Phone number',
    'name:website|url|label:Personal website',
    'name:password|password|label:Choose your password',
    'name:birthday|date',
    'name:amount|range|min=5|max=25',
    'name:bio|textarea|label:Personal bio|rows=6',
    'name:gender|options:male,female',
    'name:photo|label:Profile picture|file',
    'name:fruits|checkboxes|options:apple,banana,orange,avocado',
    'name:country|radio|options:United States,Mexico,Canada,Other',
    'name:agree|label:Agree to the terms and conditions|checkbox',
    'name:token|hidden|label:none|text',
    'component:vfb-buttons|label:none|submitText=SUBMIT|resetText=RESET'
]

const wrapper = mount(VueFormBuilder, {
    propsData: {
        fields,
        model: { token: 'd43aa11a-f055-4266-b4c1-b9b0b3ec79aa' },
        errors: {},
        messages: {},
    }
})

// ─────────────────────────────────────────────────────────────────────────────

test('it mounts', () => {
    expect(wrapper).toBeTruthy()
})

test('it displays labels properly', () => {
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

test('it sets correct input types', () => {
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
    expect(checkbox).toBeTruthy()
    expect(checkbox.attributes('type')).toBe('checkbox')
})

test('it renders textarea', () => {
    const textarea = wrapper.find('textarea') 
    expect(textarea).toBeTruthy()
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
    expect(select).toBeTruthy()

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
    expect(input).toBeTruthy()
    expect(input.attributes('name')).toBe('token')
})

test('it renders custom component', () => {
    const buttons = wrapper.find('.vfb-buttons')
    expect(buttons).toBeTruthy()
    expect(buttons.find('[type=submit]').text()).toBe('SUBMIT')
    expect(buttons.find('[type=reset]').text()).toBe('RESET')
})

// ────────────────────────────────────────────────────────────────────────────────
// async tests

test('it shows errors', async () => {
    const errors = {
        name: 'Name must be longer.',
        email: 'Email is required.',
        phone: 'Phone is invalid.',
        website: 'Website must be valid URL.',
        password: 'Password must contain letters and numbers.',
        bio: 'Bio cannot have more than 100 words.',
        gender: 'Pick a gender',
        photo: 'File size must be below 2MB.',
        fruits: 'Choose at most 3 fruits.',
        country: 'Select a country.',
        agree: 'We cannot procede without agreement.',
    }

    await wrapper.setProps({ errors })

    let errorsArray = Object.values(errors)
    let feedbacks = wrapper.findAll(`.vfb-feedback-invalid.visible`)

    expect(feedbacks).toHaveLength(errorsArray.length)

    for (let i = 0; i < feedbacks.length; i += 1)
        expect(feedbacks.at(i).text()).toBe(errorsArray[i])
})

test('it hides errors', async () => {
    await wrapper.setProps({ errors: {} })
    expect(wrapper.findAll(`.vfb-feedback-invalid.visible`)).toHaveLength(0)
})

// reset form
// messages
// validation
// errors