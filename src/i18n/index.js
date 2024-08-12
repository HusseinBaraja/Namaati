import { createI18n } from "vue-i18n";

const messages = {
  en: {
    apps: "Apps",
    Home: "Home",
    Register: "Register",
    // Add other translations here
  },
  ar: {
    apps: "التطبيقات",
    Home: "الرئيسية",
    Register: "التسجيل",
    // Add other Arabic translations here
  },
};

const i18n = createI18n({
  legacy: false,
  locale: "en",
  messages,
});

export default i18n;
