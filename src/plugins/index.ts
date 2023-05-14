/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import { loadFonts } from "./WebFontLoader";
import vuetify from "./PluginVuetify";
import pinia from "./store";
import router from "./router";

// Types
import type { App } from "vue";

export function registerPlugins(app: App) {
  loadFonts().then();
  app.use(vuetify).use(router).use(pinia);
}
