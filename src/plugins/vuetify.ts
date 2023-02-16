//Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

import { createVuetify } from "vuetify";
import { md3 } from "vuetify/blueprints";
import { VDataTable, VDataTableServer } from "vuetify/labs/VDataTable";

export default createVuetify({
  blueprint: md3,
  components: {
    VDataTable,
    VDataTableServer,
  },
  theme: {
    defaultTheme: "light",
  },
});
