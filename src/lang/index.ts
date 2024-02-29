import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Locales
import en from "./locales/en.json";
import ar from "./locales/ar.json";

i18n.use(initReactI18next).init({
  fallbackLng: localStorage.getItem("naseej-lang") || "en",
  compatibilityJSON: "v3",
  lng: localStorage.getItem("naseej-lang") || "en",
  resources: {
    en: {
      translation: en,
    },
    ar: {
      translation: ar,
    },
  },
});

export default i18n;
