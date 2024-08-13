import "./css/main.css";

import { createApp } from "vue";
import { createI18n } from "vue-i18n";

import App from "./App.vue";
import translations from "./i18n/translations.js";

import router from "./router";
// import i18n from "./i18n";

const app = createApp(App);

// app.use(Atlas);
app.use(router);

const i18n = createI18n({
  locale: "en", // set locale
  fallbackLocale: "en", // set fallback locale
  messages: translations, // set locale messages
});

app.use(i18n);

app.mount("#app");
