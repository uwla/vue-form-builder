import { Parser } from '../src/parser'
import { shuffleArray } from '../src/helpers'

// ─────────────────────────────────────────────────────────────────────────────
// We will reuse some variables throughout the tests

// create an instance of a parser
const parser = new Parser()

// text fields
const textFields = [
    'name:name|text|min=5|max=30',
    'name:email_address|email|required',
    'name:bio|textarea|label:Personal bio|rows=6',
    'name:gender|options:male,female',
    'name:photo|label:Profile picture|file',
    'name:fruits|checkboxes|options:apple,banana,orange,avocado',
    'name:country|radio|options:United States,Mexico,Canada,Other',
    'name:token|hidden|text|value=d43aa11a-f055-4266-b4c1-b9b0b3ec79aa',
    'component:CustomField|prop1=foo|prop2=false|prop3=100'
]

// object fields
const objFields = [
    {
        name: 'event_name',
        props: {
            type: 'text'
        }
    },
    {
        name: 'meeting',
        label: 'Pick a date for your meeting',
        component: 'CustomDatePicker',
        props: {
            theme: 'green',
            enableTransitions: true,
            range: ['2024-02-01', '2024-06-30'],
            calendar: {
                provider: 'CALENDAR_PROVIDER',
                apiKey: 'SECRET_KEY',
            }
        },
    },
    {
        component: 'vfb-buttons',
        label: 'none',
        props: {
            submitText: 'UPDATE',
            cancelText: 'CANCEL',
        }
    }
]

// mix of text and object fields
const mixedFields = shuffleArray([...textFields, ...objFields])

// field with all sorts of custom components
const veryCustomizedFields = [
    {
        component: 'foo',
        componentWrapper: 'bar',
        componentFeedback: 'zoo',
        props: {
            a: 1,
            b: 2,
        },
        propsWrapper: {
            c: 3,
            d: 4,
        }
    },
    {
        component: 'abc',
        componentWrapper: 'def',
        componentFeedback: 'ghi',
        props: {
            a1: [1,2,3],
            b2: [4,5,6],
        },
        propsWrapper: {
            c3: false,
            d4: true,
        }
    },
]

// this variable will store the parsed fields
let fields = []

// ─────────────────────────────────────────────────────────────────────────────
// TESTS

test('it parses text fields', () => {
    fields = parser.parseFields(textFields)

    // name field
    expect(fields[0].props.type).toBe('text')
    expect(fields[0].props.name).toBe('name')
    expect(fields[0].props.min).toBe(5)
    expect(fields[0].props.max).toBe(30)
    expect(fields[0].component).toBe('vfb-input')

    // email field
    expect(fields[1].props.type).toBe('email')
    expect(fields[1].props.name).toBe('email_address')
    expect(fields[1].props.required).toBe(true)
    expect(fields[1].propsWrapper.label).toBe('Email address')
    expect(fields[1].component).toBe('vfb-input')

    // bio field
    expect(fields[2].props.name).toBe('bio')
    expect(fields[2].props.rows).toBe(6)
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

    // token
    expect(fields[7].props.value).toBe('d43aa11a-f055-4266-b4c1-b9b0b3ec79aa')
    expect(fields[7].props.hidden).toBe(true)

    // custom
    expect(fields[8].component).toBe('CustomField')
    expect(fields[8].props.prop1).toBe('foo')
    expect(fields[8].props.prop2).toBe(false)
    expect(fields[8].props.prop3).toBe(100)
})

test('it parses object fields', () => {
    fields = parser.parseFields(objFields)
    expect(fields).toMatchObject(objFields)

    // more checks
    expect(fields[0].type).toBe('input')
    expect(fields[0].component).toBe('vfb-input')
})

test('it parser mixed fields', () => {
    fields = parser.parseFields(mixedFields)
    expect(fields).toBeTruthy()
})

test('it parser very customized fields', () => {
    fields = parser.parseFields(veryCustomizedFields)
    expect(fields).toMatchObject(veryCustomizedFields)
})

test('it assigns ID to the fields', () => {
    fields = parser.parseFields(mixedFields)
    for (let field of fields)
    {
        // skip fields without label, cause they don't an ID
        if (field.label === 'none') continue

        // the label-for of the wrapper should match the field ID
        expect(field.props.id).toBe(field.propsWrapper.labelFor)
    }
})

test('it parses fields using bootstrap components', () => {
    let parser = new Parser({ useBootstrap: true })

    // we need to get fields without custom components
    let fieldsWithoutCustomComponents = mixedFields.filter(f => {
        if (typeof f === 'string' && f.includes('component:'))
            return false
        if (typeof f === 'object' && f.component)
            return false
        return true
    })

    // parse them
    fields = parser.parseFields(fieldsWithoutCustomComponents)

    for (let field of fields)
    {
        expect(field.component).toBe(parser.componentsBootstrap[field.type])

        if (field.props.hidden) // hidden fields have a div as default wrapper
            expect(field.componentWrapper).toBe('div')
        else
            expect(field.componentWrapper).toBe(parser.componentsBootstrap.wrapper)
    }
})

test('it parses fields using custom wrapper', () => {
    let parser = new Parser({ wrapper: 'CustomWrapper' })
    fields = parser.parseFields(mixedFields)

    for (let field of fields)
    {
        if (field.props.hidden) // hidden fields have a div as default wrapper
            expect(field.componentWrapper).toBe('div')
        else
            expect(field.componentWrapper).toBe('CustomWrapper')
    }
})