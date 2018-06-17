import * as i18next from 'i18next';
// import Backend from 'i18next-chained-backend';
// import LocalStorageBackend from 'i18next-localstorage-backend';
import * as LngDetector from 'i18next-browser-languagedetector';

export const configI18n: i18next.InitOptions = {
  debug: process.env.NODE_ENV !== 'production',
  defaultNS: 'translations',
  detection: {
    caches: ['localStorage', 'cookie'],
    cookieDomain: 'happyculteur_domain',
    cookieMinutes: 10,
    htmlTag: document.documentElement,
    lookupCookie: 'i18next',
    lookupFromPathIndex: 0,
    lookupFromSubdomainIndex: 0,
    lookupLocalStorage: 'i18nextLng',
    lookupQuerystring: 'lng',
    order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag', 'path', 'subdomain']
  },
  fallbackLng: 'en',
  keySeparator: false, // key === content
  load: 'languageOnly',
  lowerCaseLng: true,
  ns: ['translations'],
  preload: ['fr', 'en'],
  // TODO: Wait or PR @types
  // backend: {
  //   backends: [ LocalStorageBackend ],
  //   backendOptions: [{
  //     prefix: 'i18next_res_',
  //     expirationTime: 7*24*60*60*1000,
  //     versions: {
  //       fr: 'v0.1', en: 'v0.1'
  //     }
  //   }]
  // },
  react: {
    nsMode: 'default',
    wait: false
  },
  resources: {
    en: {
      translations: {
        ...require('../locales/en/translations.json')
      }
    },
    fr: {
      translations: {
        ...require('../locales/fr/translations.json')
      }
    }
  }
};

const i18Instance = i18next
  .use(LngDetector)
  // .use(Backend)
  .init(configI18n);

export default i18Instance;
