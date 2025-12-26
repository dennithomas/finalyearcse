import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          welcome: "Welcome",
          settings: "Settings",
          supportMultiLanguage: "Support Multiple Languages",
          selectLanguage: "Select Language"
        }
      },
      hi: {
        translation: {
          welcome: "स्वागत है",
          settings: "सेटिंग्स",
          supportMultiLanguage: "एकाधिक भाषाओं का समर्थन करें",
          selectLanguage: "भाषा चुनें"
        }
      },
      ta: {
        translation: {
          welcome: "வரவேற்பு",
          settings: "அமைப்புகள்",
          supportMultiLanguage: "பல மொழிகளுக்கு ஆதரவு",
          selectLanguage: "மொழியைத் தேர்ந்தெடுக்கவும்"
        }
      }
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    }
  });

export default i18n;
