import { createApp } from "vue";

// Prime Vue
import "primevue/resources/themes/lara-light-teal/theme.css";
import PrimeVue from "primevue/config";
import Button from "primevue/button";
import Calendar from "primevue/calendar";
import Chips from "primevue/chips";
import ColorPicker from "primevue/colorpicker";
import Dialog from "primevue/dialog";
import Dropdown from "primevue/dropdown";
import InputText from "primevue/inputtext";
import Rating from "primevue/rating";
import TabPanel from "primevue/tabpanel";
import TabView from "primevue/tabview";
import Textarea from "primevue/textarea";

// Import local components.
import { components } from "./main";
import App from "./demo/App.vue";

// Create the application.
const app = createApp(App);

// Register local components.
for (const name in components) {
    app.component(name, components[name]);
}

// Register PrimeVue components.
app.use(PrimeVue);
app.component("Button", Button);
app.component("Calendar", Calendar);
app.component("Chips", Chips);
app.component("ColorPicker", ColorPicker);
app.component("Dialog", Dialog);
app.component("Dropdown", Dropdown);
app.component("InputText", InputText);
app.component("Rating", Rating);
app.component("TabPanel", TabPanel);
app.component("TabView", TabView);
app.component("Textarea", Textarea);

// Mount the app.
app.mount("#app");
