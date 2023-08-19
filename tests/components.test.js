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
    'name:languages|multiple|options:bash,c,c++,go,java,javascript,php,python,perl,r',
    'name:agree|label:Agree to the terms and conditions|checkbox',
    'name:token|hidden|label:none|text',
    'component:vfb-buttons|label:none|submitText=SUBMIT|resetText=RESET'
]

// the model, which will be later used.
const model = {
    name: 'john',
    email: 'john@email.test',
    gender: 'male',
    phone: '+1 999 9999-9999',
    fruits: ['banana', 'avocado'],
    website: 'http://example.test/',
    country: 'Mexico',
    agree: true,
    bio: 'Hello, this is John Doe from Mexico. I like bananas.',
    token: 'd43aa11a-f055-4266-b4c1-b9b0b3ec79aa',
}

// error messages, used later
const errors = {
    name: 'Name must be longer.',
    email: 'Email is required.',
    phone: 'Phone is invalid.',
    website: 'Website must be valid URL.',
    password: 'Password must contain letters and numbers.',
    bio: 'Bio cannot have more than 100 words.',
    gender: 'Pick a gender',
    photo: 'File size must be below 2MB.',
    fruits: 'Choose fruits.',
    country: 'Select a country.',
    agree: 'We must reach an agreement.',
}

// success messages, used later
const messages = {
    name: 'all right!',
    email: 'email looks good!',
    phone: 'phone looks good!',
    website: 'url looks good!',
    password: 'strong password!',
    bio: 'all right!',
    gender: 'all right!',
    photo: 'awesome!',
    fruits: 'all right',
    country: 'all right',
    agree: 'congrats',
}

// validation rules, used later
const validationRules = {
    name: (val) => {
        if (val.length < 3)
            return 'Name too short'
        if (val.length > 30)
            return 'Name too long'
        return true
    },
    fruits: (val) => {
        if (val.length > 3)
            return 'Pick 3 fruits at most'
        if (val.length < 1)
            return 'Pick 1 fruit at least'
        return true
    },
    bio: (val) => {
        if (! val.includes('hello'))
            return 'Your bio must include the world "hello"'
        return true
    },
    languages: (val) => {
        if (val.length < 2)
            return 'it is required to know at least two languages'
        if (!val.includes('java') && !val.includes('c++'))
            return 'it is required that you know Java or C++'
        return true
    },
    agree: (val) => val,
}


// wrapper
const wrapper = mount(VueFormBuilder, {
    propsData: {
        fields,
        model: {},
        errors: {},
        messages: {},
        validation: {},
        validateOnSubmit: false,
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

test('it shows messages', async () => {
    await wrapper.setProps({ messages })

    let messagesArray = Object.values(messages)
    let feedbacks = wrapper.findAll(`.vfb-feedback-valid.visible`)

    expect(feedbacks).toHaveLength(messagesArray.length)

    for (let i = 0; i < feedbacks.length; i += 1)
        expect(feedbacks.at(i).text()).toBe(messagesArray[i])
})

test('it hides messages', async () => {
    await wrapper.setProps({ messages: {} })
    expect(wrapper.findAll(`.vfb-feedback-valid.visible`)).toHaveLength(0)
})

test('it syncs with the model', async () => {
    await wrapper.setProps({ model })

    for (let key in model)
    {
        let value = model[key]

        // radio options
        if (key === 'country')
        {
            const radios = wrapper.findAll(`[name=${key}]`)
            for (let i = 0; i < radios.length; i+=1)
            {
                let radio = radios.at(i).element
                expect(radio.checked).toBe(radio.value === value)
            }
            continue
        }

        // checkboxes
        if (key === 'fruits')
        {
            const checkboxes = wrapper.findAll(`[name=${key}]`)
            for (let i = 0; i < checkboxes.length; i += 1)
            {
                let checkbox = checkboxes.at(i)
                let val = checkbox.element.value
                expect(checkbox.element.checked).toBe(value.includes(val))
            }
            continue
        }

        // text inputs
        if (typeof value === 'string')
        {
            const input = wrapper.find(`[name=${key}]`)
            expect(input.element.value).toBe(value)
            continue
        }

        // checkbox
        if (value === true || value === false)
        {
            const checkbox = wrapper.find(`[name=${key}]`)
            expect(checkbox.element.checked).toBe(value)
        }
    }
})

test('it submits the form correctly', async () => {
    const values  = {
        name: 'Mary Lindsey',
        email: 'mary@email.test',
        phone: '+100 12345 6789',
        website: 'http://mary.me',
        birthday: '1980-01-01',
        amount: '10',
        bio: 'hello world!',
        gender:  'female',
        fruits: ['apple', 'orange'],
        country: 'Mexico',
        agree: false,        
    } 

    for (let key in values)
    {
        let val = values[key]

        if (key === 'fruits')
        {
            const checkboxes = wrapper.findAll(`[name=${key}]`)
            for (let i = 0; i < checkboxes.length; i += 1)
            {
                let checkbox = checkboxes.at(i)
                checkbox.setChecked(val.includes(checkbox.element.value))
            }
            continue
        }

        if (key === 'country')
        {
            const radios = wrapper.findAll(`[name=${key}]`)
            for (let i = 0; i < radios.length; i += 1)
            {
                let radio = radios.at(i)
                if (val === radio.element.value)
                    radio.setChecked()
            }
            continue
        }

        if (typeof val === 'string')
        {
            const input = wrapper.find(`[name=${key}]`)
            input.setValue(val)
        }

        if (val === true || val === false)
        {
            const checkbox = wrapper.find(`[name=${key}]`)
            checkbox.setChecked(val)
        }
    }

    // trigger a submit event
    await wrapper.trigger('submit')

    // get the event object
    const event = wrapper.emitted('submit')[0]

    // assert event has been emitted
    expect(event).toBeTruthy()

    // assert payload
    const payload = event[0]
    expect(payload).toMatchObject(values)
})

test('it resets the form', async () => {
    await wrapper.trigger('reset')
    await wrapper.trigger('submit')

    // get the event object (which is the second submit event)
    const event = wrapper.emitted('submit')[1]

    // assert event has been emitted
    expect(event).toBeTruthy()

    // assert payload matches model
    const payload = event[0]
    expect(payload).toMatchObject(model)
})

test('it can validate on input', async () => {
    await wrapper.setProps({
        validateOnInput: true,
        validation: validationRules,
        errors: errors,
        clearFeedbackOnInput: false,
    })
    wrapper.vm.setupFeedback()

    let feedbackText = () => wrapper.find('.vfb-feedback-invalid.visible').text()
    let feedbacks = () => wrapper.findAll('.vfb-feedback-invalid.visible')

    // short name
    await wrapper.find('[name=name]').setValue('Le')
    expect(feedbackText()).toBe('Name too short')

    // long name
    let name = 'Katelynn Medhurst Michale Sporer Leatha Stiedemann'
    await wrapper.find('[name=name]').setValue(name)
    expect(feedbackText()).toBe('Name too long')

    // set valid name
    await wrapper.find('[name=name]').setValue('John Doe')
    expect(feedbacks()).toHaveLength(0)

    // set invalid bio
    await wrapper.find('[name=bio]').setValue("Hi, I'm John")
    expect(feedbackText()).toBe('Your bio must include the world "hello"')

    // set valid bio
    await wrapper.find('[name=bio]').setValue("Hi, hello, I'm John")
    expect(feedbacks()).toHaveLength(0)

    // invalid agreement
    await wrapper.find('[name=agree]').setChecked(false)
    expect(feedbackText()).toBe(errors['agree'])

    // valid agreement
    await wrapper.find('[name=agree]').setChecked(true)
    expect(feedbacks()).toHaveLength(0)

    // checkboxes
    let checkboxes = wrapper.findAll('[name=fruits]')

    // first reset everything
    for (let i = 0; i < checkboxes.length; i += 1)
        await checkboxes.at(i).setChecked(false)

    // check all
    for (let i = 0; i < checkboxes.length; i += 1)
        await checkboxes.at(i).setChecked(true)
    expect(feedbackText()).toBe('Pick 3 fruits at most')

    // uncheck all
    for (let i = 0; i < checkboxes.length; i += 1)
        await checkboxes.at(i).setChecked(false)
    expect(feedbackText()).toBe('Pick 1 fruit at least')
})

// validation