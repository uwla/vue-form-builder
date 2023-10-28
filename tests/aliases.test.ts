import { expect, test } from 'vitest'
import fieldAliases from '../src/aliases'

let key = 'name'
let val : FieldAlias = 'name:name|label|Full name|text'
let newVal : FieldAlias = 'name:name|label:Enter your full name|text'

let aliases : FieldAliases = { 
    'job': 'name:job|text|label:Current job',
    'agree': 'name:agree|checkbox|label:Agree to terms and conditions',
    'country': 'name:country|options:USA,Canada,Mexico,Other',
    'languages': 'name:languages|checkboxes|multiple|options:bash,c,c++,go,java,javascript,python',
 }

 let newAliases : FieldAliases = {
    'country': {
        name: 'country',
        component: 'multiselect',
        props: { options: ['USA', 'Canada', 'Mexico', 'Other'] },
    },
    'languages': {
        name: 'lang',
        component: 'b-form-checkbox-group',
        label: 'Programming languages',
        props: {
            multiple: true,
            options: [
                'bash', 'c', 'c++', 'c#', 'go', 'java', 'javascript', 'perl',
                'python', 'php', 'racket'
            ].map(x => ({ text: x, value: x }))
        }
    }
 }

// save current aliases, so we can revert the state changes we will perform
let originalAliases : FieldAliases = fieldAliases.getAllAliases()

// first, we delete all aliases, to empty the internal state
test('it deletes all aliases', () => {
    fieldAliases.delAllAliases()
    expect(fieldAliases.getAllAliases()).toEqual({})
})

// SINGLE ALIAS
test('it add an alias', () => {
    fieldAliases.addAlias(key, val)
    expect(fieldAliases.isAlias(key)).toBe(true)
    expect(fieldAliases.getAlias(key)).toBe(val)
})

test('it does not override alias when adding', () => {
    fieldAliases.addAlias(key, newVal)
    expect(fieldAliases.getAlias(key)).toBe(val)
})

test('it changes an existing alias', () => {
    fieldAliases.setAlias(key, newVal)
    expect(fieldAliases.getAlias(key)).toBe(newVal)
})

test('it deletes an alias', () => {
    fieldAliases.delAlias(key)
    expect(fieldAliases.isAlias(key)).toBe(false)
})

//

test('it adds several aliases', () => {
    fieldAliases.addAliases(aliases)
    expect(fieldAliases.getAliases(Object.keys(aliases))).toEqual(Object.values(aliases))
})

test('it changes several aliases', () => {
    fieldAliases.setAliases(newAliases)
    expect(fieldAliases.getAliases(Object.keys(newAliases))).toEqual(Object.values(newAliases))
})

test('it does not add multiple aliases if they exist', () => {
    fieldAliases.addAliases(aliases)
    expect(fieldAliases.getAliases(Object.keys(newAliases))).toEqual(Object.values(newAliases))
})

test('it deletes several aliases', () => {
    fieldAliases.delAliases(Object.keys(aliases))
    expect(fieldAliases.getAliases(Object.keys(aliases))).toEqual([])
})

test('it does not set aliases if they do not exist', () => {
    fieldAliases.setAliases(newAliases)
    expect(fieldAliases.getAliases(Object.keys(newAliases))).toEqual([])
})

test('it gets all aliases', () => {
    fieldAliases.addAliases(newAliases)
    expect(fieldAliases.getAllAliases()).toStrictEqual(newAliases)
})

// revert changes done to the internal state
fieldAliases.delAllAliases()
fieldAliases.addAliases(originalAliases)
