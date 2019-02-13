import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LngDetector from "i18next-browser-languagedetector";

const languageDetectorOptions = {
  order: ["localStorage", "navigator"],
  lookupLocalStorage: "happyculteur_i18nextLng",
  caches: ["localStorage"]
};

export const configI18n: i18next.InitOptions = {
  debug: process.env.NODE_ENV !== "production",
  lng: "fr",
  fallbackLng: "fr",
  keySeparator: false, // key === content
  ns: ["translations"],
  load: "languageOnly",
  defaultNS: "translations",
  preload: ["fr", "en"],
  resources: {
    en: {
      translations: {
        ...require("../locales/en/translations.json")
      }
    },
    fr: {
      translations: {
        ...require("../locales/fr/translations.json")
      }
    }
  },
  detection: languageDetectorOptions
};

const i18Instance = i18next
  .use(LngDetector)
  .use(initReactI18next)
  .init(configI18n);

export default i18Instance;
