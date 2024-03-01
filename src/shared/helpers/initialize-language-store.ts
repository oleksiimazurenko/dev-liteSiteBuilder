import { useDictionaryStore } from '../store/dictionary-store'


// Вспомогательная функция для инициализации состояния
export const initializeLanguageStore = () => {
  const language = typeof window !== 'undefined' ? localStorage.getItem('language') || navigator.language.slice(0, 2) : 'en';
  useDictionaryStore.getState().setLanguage(language);
}