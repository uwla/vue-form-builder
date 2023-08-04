import { Parser } from '../src/parser'

test('it parses text fields', () => {
    const textFields = [
        'name:name|text',
        'name:email_address|email',
        'name:bio|textarea|label:Personal bio',
        'name:gender|options:male,female',
        'name:photo|label:Profile picture|file',
        'name:fruits|checkboxes|options:apple,banana,orange,avocado',
        'name:country|radio|options:United States,Mexico,Canada,Other',
    ]

    const parser = new Parser()
    const fields = parser.parseFields(textFields)

    // name field
    expect(fields[0].props.type).toBe('text')
    expect(fields[0].props.name).toBe('name')
    expect(fields[0].component).toBe('vfb-input')

    // email field
    expect(fields[1].props.type).toBe('email')
    expect(fields[1].props.name).toBe('email_address')
    expect(fields[1].propsWrapper.label).toBe('Email address')
    expect(fields[1].component).toBe('vfb-input')

    // bio field
    expect(fields[2].props.name).toBe('bio')
    expect(fields[2].propsWrapper.label).toBe('Personal bio')
    expect(fields[2].component).toBe('vfb-textarea')

    // gender field
    expect(fields[3].props.name).toBe('gender')
    expect(fields[3].props.options).toEqual([
        { value: 'male', text: 'male' },
        { value: 'female', text: 'female' },
    ])
    expect(fields[3].component).toBe('vfb-select')

    // photo field
    expect(fields[4].props.name).toBe('photo')
    expect(fields[4].propsWrapper.label).toBe('Profile picture')
    expect(fields[4].component).toBe('vfb-file')

    // fruits field
    expect(fields[5].props.name).toBe('fruits')
    expect(fields[5].props.options).toEqual([
        { value: 'apple', text: 'apple' },
        { value: 'banana', text: 'banana' },
        { value: 'orange', text: 'orange' },
        { value: 'avocado', text: 'avocado' },
    ])
    expect(fields[5].component).toBe('vfb-checkboxes')

    // country field
    expect(fields[6].props.name).toBe('country')
    expect(fields[6].props.options).toEqual([
        { value: 'United States', text: 'United States' },
        { value: 'Mexico', text: 'Mexico' },
        { value: 'Canada', text: 'Canada' },
        { value: 'Other', text: 'Other' },
    ])
    expect(fields[6].component).toBe('vfb-radio')
})