//Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

import { createVuetify } from "vuetify";
import { md3 } from "vuetify/blueprints";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import * as labComponents from "vuetify/labs/components";

export default createVuetify({
  blueprint: md3,
  components: {
    ...components,
    ...labComponents,
  },
  directives,
  theme: {
    defaultTheme: "light",
  },
});
