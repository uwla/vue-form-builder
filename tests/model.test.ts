import { model, simulateUserInput, wrapper } from './common'

test('it syncs with the model', async () => {
    await wrapper.setProps({ model })

    for (let key in model)
    {
        let value = model[key]

        // radio options
        if (key === 'country')
        {
            const radios : any = wrapper.findAll(`[name=${key}]`)
            for (let i = 0; i < radios.length; i+=1)
            {
                let radio = radios[i].element
                expect(radio.checked).toBe(radio.value === value)
            }
            continue
        }

        // checkboxes
        if (key === 'fruits')
        {
            const checkboxes : any = wrapper.findAll(`[name=${key}]`)
            for (let i = 0; i < checkboxes.length; i += 1)
            {
                let checkbox = checkboxes[i]
                let val = checkbox.element.value
                console.log(val, value.includes(val), checkbox.element.checked);
                // expect(checkbox.element.checked).toBe(value.includes(val))
            }
            continue
        }

        // text inputs
        if (typeof value === 'string')
        {
            const input : any = wrapper.find(`[name=${key}]`)
            expect(input.element.value).toBe(value)
            continue
        }

        // checkbox
        if (value === true || value === false)
        {
            const checkbox : any = wrapper.find(`[name=${key}]`)
            expect(checkbox.element.checked).toBe(value)
        }
    }
})

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

    // get the submit events
    const events : any = wrapper.emitted('submit')
    expect(events.length).toBeGreaterThan(0)

    // get the event object
    const event = events[events.length - 1]

    // assert event has been emitted
    expect(event).toBeTruthy()

    // assert payload
    const payload = event[0]
    expect(payload).toMatchObject(values)
})

// test('it resets the form to the model', async () => {
//     await wrapper.trigger('reset')
//     await wrapper.trigger('submit')

//     // get the event object (which is the second submit event)
//     const event : any = (wrapper.emitted('submit') as any)[1]

//     // assert event has been emitted
//     expect(event).toBeTruthy()

//     // assert payload matches model
//     const payload = event[0]
//     expect(payload).toMatchObject(model)
// })

// test('it omits null values', async () => {
//     await wrapper.setProps({ omitNull: true, validation: {} })

//     await wrapper.find('[name=name]').setValue('')
//     await wrapper.find('[name=phone]').setValue('')
//     await wrapper.find('[name=bio]').setValue('')
//     await wrapper.find('[name=gender]').setValue('')
//     await wrapper.find('[name=birthday]').setValue('')
//     await wrapper.find('[name=token]').setValue('')
//     wrapper.findAll('[name=fruits]').forEach(async (c : any) => { await c.setChecked(true) })
//     wrapper.findAll('[name=fruits]').forEach(async (c : any) => { await c.setChecked(false) })

//     // filter values to not include null ones
//     const keys = ['website_url', 'email', 'country', 'agree']
//     const values : any = {}
//     keys.forEach((k : string) => values[k] = model[k])

//     // trigger submit
//     await wrapper.trigger('submit')

//     // get the submit events
//     const events : any = wrapper.emitted('submit')
//     expect(events.length).toBeGreaterThan(1)

//     // get the event object
//     const event = events[events.length - 1]

//     // assert event has been emitted
//     expect(event).toBeTruthy()

//     // assert payload matches the expected
//     const payload = event[0]
//     expect(payload).toStrictEqual(values)
// })