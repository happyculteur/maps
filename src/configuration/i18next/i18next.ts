import i18next from "i18next";
import LngDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

const languageDetectorOptions = {
  caches: ["localStorage"],
  lookupLocalStorage: "happyculteur_i18nextLng",
  order: ["localStorage", "navigator"]
};

export const configI18n: i18next.InitOptions = {
  debug: process.env.NODE_ENV !== "production",
  defaultNS: "translations",
  detection: languageDetectorOptions,
  fallbackLng: "fr",
  keySeparator: false, // key === content
  lng: "fr",
  load: "languageOnly",
  ns: ["translations"],
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
  }
};

const i18Instance = i18next
  .use(LngDetector)
  .use(initReactI18next)
  .init(configI18n);

export default i18Instance;
