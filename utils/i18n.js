import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "dashboard": "Creator Dashboard",
      "monetization": "Monetization Active",
      "withdraw": "Withdraw",
      "record": "Record",
      "typeMessage": "Type a message..."
    }
  },
  hi: {
    translation: {
      "dashboard": "क्रिएटर डैशबोर्ड",
      "monetization": "मोनेटाइजेशन चालू है",
      "withdraw": "पैसे निकालें",
      "record": "रिकॉर्ड करें",
      "typeMessage": "मैसेज लिखें..."
    }
  },
  cg: {
    translation: {
      "dashboard": "क्रिएटर डैशबोर्ड",
      "monetization": "मोनेटाइजेशन चालू हे",
      "withdraw": "पइसा निकालव",
      "record": "रिकॉर्ड करव",
      "typeMessage": "मैसेज लिखव..."
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", // Default language
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
