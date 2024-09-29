/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from "@/plugins";

// Components
import App from "./App.vue";

// Composables
import { createApp } from "vue";
import "../src/index.css";
import Vuelidate from "@vuelidate/core";
import { createPinia } from "pinia";
const app = createApp(App);
const pinia = createPinia();
registerPlugins(app);
app.use(Vuelidate);
app.use(pinia);
app.mount("#app");
