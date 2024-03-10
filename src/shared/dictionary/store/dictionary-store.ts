import { getDictionary } from "@/shared/dictionary/helpers/get-dictionary";
import { create } from "zustand";
import { setLangUser } from '../actions/set/set-lang-user'

export type Dictionary = {
  [key: string]: string | string[] | Dictionary;
};

export type DictionaryState = {
  language: string;
  dictionary: Dictionary;
};

export type DictionaryActions = {
  setLanguage: (newLanguage: string) => Promise<void>;
  loadDictionary: () => Promise<void>;
};

const initialState: DictionaryState = {
  language: "en",
  dictionary: {},
};

export const useDictionaryStore = create<DictionaryState & DictionaryActions>(
  (set, get) => ({
    ...initialState,
    setLanguage: async (newLanguage: string) => {
      // Берем словарь для нового языка
      const dictionary = await getDictionary(newLanguage);
      // Обновляем состояние
      set({ language: newLanguage, dictionary });
    },
    loadDictionary: async () => {
      const { language } = get();
      const dictionary = await getDictionary(language);
      set({ dictionary });
    },
  }),
);
