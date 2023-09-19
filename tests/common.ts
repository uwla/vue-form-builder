import { mount } from '@vue/test-utils'
import CustomField from './components/CustomField.vue'
import CustomWrapper from './components/CustomWrapper.vue'
import CustomFeedback from './components/CustomFeedback.vue'
import CalendarField from './components/CalendarField.vue'
import { components, VueFormBuilder } from '../src/main'
import { shuffleArray } from '../src/helpers'

// ────────────────────────────────────────────────────────────────────────────────
// COMMON VARIABLES USED ACROSS TEST SUITES

export const textFields : FieldDescription[] = [
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
export const fields : FieldDescription[] = textFields

// object fields
export const objFields : FieldDescription[] = [
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
export const mixedFields : FieldDescription[] = shuffleArray([...textFields, ...objFields])

// field with all sorts of custom components
export const veryCustomizedFields : FieldDescription[] = [
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

// ─────────────────────────────────────────────────────────────────────────────
// VUE WRAPPER

export const wrapper = mount(VueFormBuilder, {
    global: {
        components: {
            ...components,
            CalendarField,
            CustomFeedback,
            CustomField,
            CustomWrapper,
        },
    },
    props: {
        fields: fields,
        model: {},
        errors: {},
        messages: {},
        validation: {},
        validateOnSubmit: false,
    },
})