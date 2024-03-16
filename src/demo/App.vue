<template>
    <h1>VUE FORM BUILDER DEMO</h1>
    <p>Sample demo to showcase VueFormBuilder's functionalities.</p>
    <vfb id="options" :fields="fieldsOptions" v-model="m" />
    <TabView id="demo" class="tabview-custom">
        <TabPanel header="VueFormBuilder">
            <vfb v-bind="commonParams" :fields="fields1" />
        </TabPanel>
        <TabPanel header="PrimeVue">
            <vfb v-bind="commonParams" :fields="fields2" provider="primevue" />
        </TabPanel>
        <TabPanel header="Vuetify">
            Because Vuetify's CSS conflicts with PrimeVue's one, the Vuetify
            demo will be available in its own demo in the future.
        </TabPanel>
    </TabView>
</template>
<script lang="ts">
import { defineComponent } from "vue";

const model = {
    name: "john",
    email: "john@email.test",
    gender: "male",
    phone: "+1 999 9999-9999",
    fruits: ["banana", "avocado"],
    website: "http://example.test/",
    country: "Canada",
    agree: true,
    bio: "Commodo proident incididunt anim reprehenderit amet occaecat in exercitation fugiat minim reprehenderit irure voluptate ad.",
};

const emptyModel = {
    name: "",
    email: "",
    gender: "",
    phone: "",
    fruits: [],
    website: "",
    country: "",
    agree: false,
    bio: "",
}

const messages = {
    name: "god job",
    email: "awesome",
    gender: "god job",
    bio: "awesome",
    fruits: "god job",
    photo: "awesome",
    country: "god job",
    agree: "awesome",
    website: "god job",
    amount: "awesome job",
    birthday: "god job",
};

const errors = {
    name: "Name must be longer.",
    email: "Email is required.",
    phone: "Phone is invalid.",
    website: "Website must be valid URL.",
    amount: "too much!",
    password: "Password must contain letters and numbers.",
    bio: "Bio cannot have more than 100 words.",
    gender: "Pick a gender",
    photo: [
        "Photo size must be below 2MB.",
        "Photo contains invalid dimensions.",
        "Supported formats are JPG or PNG.",
    ],
    fruits: "Choose at most 3 fruits",
    country: "Select a country.",
    agree: "We cannot procede without agreement.",
};

const validation = {
    name: (val: any) => {
        if (val.length < 5) return "name must be longer";
        if (val.length > 20) return "name must be smaller";
        return true;
    },
    bio: (val: any) => {
        if (!val.includes("hello")) return 'bio must include the world "hello"';
        return true;
    },
    fruits: (val: any) => {
        if (val.length < 2) return "must choose at least 2 items!";
        return true;
    },
    agree: (val: any) => val,
};

const fields1 = [
    "name:name|text|min=5|max=30",
    "name:email|email",
    "name:phone|tel|label:Phone number",
    "name:website|url|label:Personal website",
    "name:password|password|label:Choose your password",
    "name:birthday|date",
    "name:bio|textarea|label:Personal bio|rows=6",
    "name:gender|options:male,female",
    "name:photo|label:Profile picture|file",
    "name:fruits|stacked|checkboxes|options:apple,banana,orange,avocado",
    "name:country|stacked|options:United States,Mexico,Canada,Other",
    "name:agree|label:Agree to the terms and conditions|checkbox",
    "name:token|hidden|label:none|text",
    "component:vfb-buttons|label:none|class=block",
];

const fields2 = [
    "name:date|component:Calendar|label:Choose a date:|dateFormat=MM dd, yy",
    {
        name: 'city',
        component: 'Dropdown',
        props: { options: ['New York', 'Dubai', 'Chicago', 'Moscou', 'Rio de Janeiro'] }
    },
    {
        name: 'rate',
        label: 'Rate me!',
        component: 'Rating',
        props: { cancel: false, stars: 5 },
    },
    "name:tags|label:Enter tags:|component:Chips",
    "name:color|label:Pick a color:|component:ColorPicker|class=color-picker",
    "name:name|text|min=5|max=30",
    "name:email|email",
    "name:phone|tel|label:Phone number",
    "name:password|password|label:Choose your password",
    "name:bio|textarea|label:Personal bio|rows=6",
    "component:vfb-buttons|label:none|class=block",
];

const fields3 : any = [
];

const emptyErrors = {}
const emptyMsg = {}

export default defineComponent({
    computed: {
        commonParams() {
            return {
                errors: (this.m.showErrors) ? errors : emptyErrors,
                modelValue: (this.m.useModel) ? model : emptyModel,
                messages: (this.m.showMessages) ? messages : emptyMsg,
                validateOnInput: this.m.validateOnInput,
                validateOnSubmit: this.m.validateOnSubmit,
                validation: validation,
            }
        }
    },
    data: () => {
        return {
            fields1,
            fields2,
            fields3,
            fieldsOptions: [
                'checkbox|name:validateOnInput',
                'checkbox|name:validateOnSubmit',
                'checkbox|name:showMessages',
                'checkbox|name:showErrors',
                'checkbox|name:useModel',
            ],
            m: {
                validateOnInput: true,
                validateOnSubmit: true,
                useModel: false,
                showMessages: false,
                showErrors: false,
            },
        }
    },
});
</script>
<style>
#options .vfb-group {
    margin-bottom: 0;
}

#demo form {
    max-width: 500px;
    border: 1px solid #bbb;
    border-radius: 0.25em;
    padding: 1em;
    margin: 0 auto;
}

.p-chips,
.p-calendar,
.p-inputtext,
.p-textarea,
.p-dropdown {
    width: 100%;
}

.color-picker {
    margin-left: 8px;
    width: 2em;
    height: 2em;
}
</style>
