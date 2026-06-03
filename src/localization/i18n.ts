import i18n from "i18next";

import { initReactI18next } from "react-i18next";

import AsyncStorage from "@react-native-async-storage/async-storage";

import en from "./locales/en.json";

import gu from "./locales/gu.json";

const LANGUAGE_KEY = "app_language";

export async function initI18n() {
  const saved = await AsyncStorage.getItem(LANGUAGE_KEY);

  const language = saved === "gu" ? "gu" : "en";

  await i18n.use(initReactI18next).init({
    compatibilityJSON: "v4",

    lng: language,

    fallbackLng: "en",

    resources: {
      en: {
        translation: en,
      },

      gu: {
        translation: gu,
      },
    },

    interpolation: {
      escapeValue: false,
    },
  });
}

export async function changeAppLanguage(language: "en" | "gu") {
  await AsyncStorage.setItem(LANGUAGE_KEY, language);

  await i18n.changeLanguage(language);
}

export default i18n;
