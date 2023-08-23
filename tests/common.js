import Vue from 'vue'
import { mount } from '@vue/test-utils'
import CustomField from './components/CustomField.vue'
import CustomWrapper from './components/CustomWrapper.vue'
import CustomFeedback from './components/CustomFeedback.vue'
import CalendarField from './components/CalendarField.vue'
import { default as install, VueFormBuilder } from '../src/main'
import { shuffleArray } from '../src/helpers'


// ────────────────────────────────────────────────────────────────────────────────
// COMMON VARIABLES USED ACROSS TEST SUITES

export const textFields = [
    'name:name|text|min=5|max=30',
    'name:email|email|required',
    'name:phone|tel|label:Phone number',
    'name:website_url|url',
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
    'component:CustomField|prop1=foo|prop2=false|prop3=100',
    'component:vfb-buttons|label:none|submitText=SUBMIT|resetText=RESET'
]

// default fields are text fields
export const fields = textFields

// object fields
export const objFields = [
    {
        name: 'event_name',
        props: {
            type: 'text'
        }
    },
    {
        name: 'meeting',
        label: 'Pick date for your meeting',
        component: 'CalendarField',
        props: {
            theme: 'green',
            enableTransitions: true,
            range: ['2024-02-01', '2024-06-30'],
            calendarDriver: {
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
export const mixedFields = shuffleArray([...textFields, ...objFields])

// field with all sorts of custom components
export const veryCustomizedFields = [
    {
        name: 'foo',
        component: 'CustomField',
        componentWrapper: 'CustomWrapper',
        componentFeedback: 'CustomFeedback',
        props: {
            prop1: [1,2,3],
            prop2: 'foo',
            prop3: 'bar',
        },
        propsWrapper: {
            a1: 'x',
            b2: [4, 5, 6],
            c3: { x: 1, y: 1 },
        }
    },
    {
        name: 'bar',
        component: 'CustomField',
        componentWrapper: 'CustomWrapper',
        componentFeedback: 'CustomFeedback',
        props: {
            prop1: null,
            prop2: false,
            prop3: { x: 1, y: 1 },
        },
        propsWrapper: {
            a1: true,
            b2: [4, 5, 6],
            c3: 'foo',
        }
    },
]

// -----------------------------------------------------------------------------

// the model, which will be later used.
export const model = {
    name: 'john',
    email: 'john@email.test',
    gender: 'male',
    phone: '+1 999 9999-9999',
    fruits: ['banana', 'avocado'],
    website_url: 'http://example.test/',
    country: 'Mexico',
    agree: true,
    bio: 'Hello, this is John Doe from Mexico. I like bananas.',
    token: 'd43aa11a-f055-4266-b4c1-b9b0b3ec79aa',
}

// the order in which the keys of the following objects appear is important
// for the tests! do not modify it!

// error messages, used later
export const errors = {
    name: 'Name must be longer.',
    email: 'Email is required.',
    phone: 'Phone is invalid.',
    website_url: 'Website must be valid URL.',
    password: 'Password must contain letters and numbers.',
    bio: 'Bio cannot have more than 100 words.',
    gender: 'Pick a gender',
    photo: 'File size must be below 2MB.',
    fruits: 'Choose fruits.',
    country: 'Select a country.',
    agree: 'We must reach an agreement',
}

// success messages, used later
export const messages = {
    name: 'name looks good',
    email: 'email looks good!',
    phone: 'phone looks good!',
    website_url: 'url is working',
    password: 'strong password, congrats',
    bio: 'bio looks good!',
    gender: 'thanks for filling it out',
    photo: 'awesome photo',
    fruits: 'awesome choice of fruits',
    country: 'valid country, nice!',
    languages: 'great languages!',
    agree: 'congrats',
}

// errors used in validation
// this variable is used to avoid repeating strings when testing validation
export const validationErrors = {
    name: {
        short: 'Name too short',
        long: 'Name too long',
    },
    fruits: {
        many: 'Pick 3 fruits at most',
        few: 'Pick 1 fruit at least',
    },
    bio: 'Your bio should include the world "hello"',
    languages: {
        few: 'Select at least two languages',
        include: 'Selected languages must include C++ or Java',
    },
    gender: 'Gender cannot be empty',
}

// validation rules
export const validationRules = {
    agree: (val) => val,
    name: (val) => {
        if (val.length < 3)
            return validationErrors['name']['short']
        if (val.length > 30)
            return validationErrors['name']['long']
        return true
    },
    fruits: (val) => {
        if (val.length > 3)
            return validationErrors['fruits']['many']
        if (val.length < 1)
            return validationErrors['fruits']['few']
        return true
    },
    bio: (val) => {
        if (! val.includes('hello'))
            return validationErrors['bio']
        return true
    },
    languages: (val) => {
        if (val.length < 2)
            return validationErrors['languages']['few']
        if (!val.includes('java') && !val.includes('c++'))
            return validationErrors['languages']['include']
        return true
    },
    gender: (val) => {
        if (val == null || val == '')
            return validationErrors['gender']
        return true
    }
}

// register some custom components
Vue.component('CustomField', CustomField)
Vue.component('CustomWrapper', CustomWrapper)
Vue.component('CustomFeedback', CustomFeedback)
Vue.component('CalendarField', CalendarField)

// before mounting the wrapper, install the vue components
Vue.use(install)

// wrapper
export const wrapper = mount(VueFormBuilder, {
    propsData: {
        fields,
        model: {},
        errors: {},
        messages: {},
        validation: {},
        validateOnSubmit: false,
    }
})