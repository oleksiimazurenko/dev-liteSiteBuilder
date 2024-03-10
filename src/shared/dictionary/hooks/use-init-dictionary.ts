import { useEffect } from "react";
import { useDictionaryStore } from "../store/dictionary-store";
import { getLangUser } from '../actions/get/get-lang-user';

// Вспомогательная функция для инициализации состояния
export function useInitDictionary() {
  const setLanguage = useDictionaryStore(state => state.setLanguage);

  useEffect(() => {
    async function fetchLangUser() {
      const { success, lang } = await getLangUser();
      if (success && lang) {
        setLanguage(lang);
      } else if (typeof navigator !== "undefined") {
        // Используйте часть языкового кода браузера, если язык с сервера не доступен
        const fallbackLang = navigator.language.slice(0, 2);
        setLanguage(fallbackLang);
      }
    }

    fetchLangUser();
  }, [setLanguage]);
}