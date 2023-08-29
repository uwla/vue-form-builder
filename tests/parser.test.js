import fieldAliases from '../src/aliases'
import { Parser } from '../src/parser'
import { componentsBootstrap } from '../src/parser/components'
import { textFields, objFields, mixedFields, veryCustomizedFields } from './common'

// ─────────────────────────────────────────────────────────────────────────────
// We will reuse some variables throughout the tests

// create an instance of a parser
const parser = new Parser()


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
    expect(fields[1].props.name).toBe('email')
    expect(fields[1].props.required).toBe(true)
    expect(fields[1].propsWrapper.label).toBe('Email')
    expect(fields[1].component).toBe('vfb-input')

    // phone field
    expect(fields[2].props.type).toBe('tel')
    expect(fields[2].props.name).toBe('phone')
    expect(fields[2].propsWrapper.label).toBe('Phone number')
    expect(fields[2].component).toBe('vfb-input')

    // website field
    expect(fields[3].props.type).toBe('url')
    expect(fields[3].props.name).toBe('website_url')
    expect(fields[3].propsWrapper.label).toBe('Website url')
    expect(fields[3].component).toBe('vfb-input')

    // password field
    expect(fields[4].props.type).toBe('password')
    expect(fields[4].props.name).toBe('password')
    expect(fields[4].propsWrapper.label).toBe('Choose your password')
    expect(fields[4].component).toBe('vfb-input')

    // birthday field
    expect(fields[5].props.type).toBe('date')
    expect(fields[5].props.name).toBe('birthday')
    expect(fields[5].propsWrapper.label).toBe('Birthday')
    expect(fields[5].component).toBe('vfb-input')

    // amount field
    expect(fields[6].props.type).toBe('range')
    expect(fields[6].props.min).toBe(5)
    expect(fields[6].props.max).toBe(25)
    expect(fields[6].props.name).toBe('amount')
    expect(fields[6].propsWrapper.label).toBe('Amount')
    expect(fields[6].component).toBe('vfb-input')

    // bio field
    expect(fields[7].props.name).toBe('bio')
    expect(fields[7].props.rows).toBe(6)
    expect(fields[7].propsWrapper.label).toBe('Personal bio')
    expect(fields[7].component).toBe('vfb-textarea')

    // gender field
    expect(fields[8].props.name).toBe('gender')
    expect(fields[8].props.options).toEqual([
        { value: 'male', text: 'male' },
        { value: 'female', text: 'female' },
    ])
    expect(fields[8].component).toBe('vfb-select')

    // photo field
    expect(fields[9].props.name).toBe('photo')
    expect(fields[9].propsWrapper.label).toBe('Profile picture')
    expect(fields[9].component).toBe('vfb-file')

    // fruits field
    expect(fields[10].props.name).toBe('fruits')
    expect(fields[10].props.options).toEqual([
        { value: 'apple', text: 'apple' },
        { value: 'banana', text: 'banana' },
        { value: 'orange', text: 'orange' },
        { value: 'avocado', text: 'avocado' },
    ])
    expect(fields[10].component).toBe('vfb-checkboxes')

    // country field
    expect(fields[11].props.name).toBe('country')
    expect(fields[11].props.options).toEqual([
        { value: 'United States', text: 'United States' },
        { value: 'Mexico', text: 'Mexico' },
        { value: 'Canada', text: 'Canada' },
        { value: 'Other', text: 'Other' },
    ])
    expect(fields[11].component).toBe('vfb-radio')

    // token
    expect(fields[14].props.hidden).toBe(true)

    // custom
    expect(fields[15].component).toBe('CustomField')
    expect(fields[15].props.prop1).toBe('foo')
    expect(fields[15].props.prop2).toBe(false)
    expect(fields[15].props.prop3).toBe(100)
})

test('it parses object fields', () => {
    fields = parser.parseFields(objFields)
    expect(fields).toMatchObject(objFields)

    // more checks
    expect(fields[0].type).toBe('input')
    expect(fields[0].component).toBe('vfb-input')
})

test('it parses mixed fields', () => {
    fields = parser.parseFields(mixedFields)
    expect(fields).toBeTruthy()
})

test('it parses very customized fields', () => {
    fields = parser.parseFields(veryCustomizedFields)
    expect(fields).toMatchObject(veryCustomizedFields)
})

test('it parses', () => {
    let keys = Object.keys(fieldAliases.getAllAliases())
    let values = Object.values(fieldAliases.getAllAliases())
    let fieldsFromKeys = parser.parseFields(keys)
    let fieldsFromValues = parser.parseFields(values)

    // need to remove the ID field, because it is unique for each field
    function removeCssId(obj) {
        delete obj.props.id
        delete obj.propsWrapper.labelFor
    }
    fieldsFromKeys.forEach(removeCssId)
    fieldsFromValues.forEach(removeCssId)

    // now, they should be strictly equal
    expect(fieldsFromKeys).toStrictEqual(fieldsFromValues)
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
        expect(field.component).toBe(componentsBootstrap[field.type])

        if (field.props.hidden) // hidden fields have a div as default wrapper
            expect(field.componentWrapper).toBe('div')
        else
            expect(field.componentWrapper).toBe(componentsBootstrap.wrapper)
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