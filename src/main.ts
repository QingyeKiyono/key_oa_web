// Vue app
import { createApp } from "vue";
import App from "./App.vue";

// Vuetify
import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.min.css";
import { createVuetify } from "vuetify";
// Vuetify Components
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
const vuetify = createVuetify({ components, directives });

// Vue Router
import router from "@/routes";

// Pinia
import pinia from "@/store";

const app = createApp(App);
app.use(vuetify);
app.use(router);
app.use(pinia);
app.mount("#app");
