import { isNullable } from '../src/helpers'
import { model, wrapper } from './common'

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

async function simulateUserInput(wrapper, values) {
    for (let key in values)
    {
        let val = values[key]

        // ─────────────────────────────────────────────────────────────────────
        // checkboxes
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

        // ─────────────────────────────────────────────────────────────────────
        // radio
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

        // ─────────────────────────────────────────────────────────────────────
        // text
        if (typeof val === 'string')
        {
            const input = wrapper.find(`[name=${key}]`)
            input.setValue(val)
        }

        // ─────────────────────────────────────────────────────────────────────
        // boolean
        if (val === true || val === false)
        {
            const checkbox = wrapper.find(`[name=${key}]`)
            checkbox.setChecked(val)
        }
    }
}

test('it submits the form correctly', async () => {
    const values  = {
        name: 'Mary Lindsey',
        email: 'mary@email.test',
        phone: '+100 12345 6789',
        website_url: 'http://mary.me',
        birthday: '1980-01-01',
        bio: 'hello world!',
        gender:  'female',
        fruits: ['apple', 'orange'],
        country: 'Mexico',
        agree: false,        
    } 

    // set the values
    await simulateUserInput(wrapper, values)

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

test('it resets the form to the model', async () => {
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

test('it omits null values', async () => {
    await wrapper.setProps({ omitNull: true, validation: {} })

    await wrapper.find('[name=name]').setValue('')
    await wrapper.find('[name=phone]').setValue('')
    await wrapper.find('[name=bio]').setValue('')
    await wrapper.find('[name=gender]').setValue('')
    await wrapper.find('[name=birthday]').setValue('')
    await wrapper.find('[name=token]').setValue('')

    wrapper.findAll('[name=fruits]').wrappers.forEach(async c => { await c.setChecked(true) })
    wrapper.findAll('[name=fruits]').wrappers.forEach(async c => { await c.setChecked(false) })

    // filter values to not include null ones
    const keys = ['website_url', 'email', 'country', 'agree']
    const values = { }
    keys.forEach(k => values[k] = model[k])

    // trigger submit
    await wrapper.trigger('submit')

    // get the event object (which is the third submit event)
    const event = wrapper.emitted('submit')[2]

    // assert event has been emitted
    expect(event).toBeTruthy()

    // assert payload matches the expected
    const payload = event[0]
    expect(payload).toStrictEqual(values)
})