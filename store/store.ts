import { create } from 'zustand';
import { Subscription } from '@/types/Subscription';

export type LanguagesSupported = 
    | "en"
    | "hi"
    | "ar"
    | "de"
    | "es"
    | "fr"
    | "ja"
    | "la"
    | "ru"
    | "zh"

export const LanguageSupportedMap: Record<LanguagesSupported, string> = {
    en: "English",
    hi: "Hindi",
    ar: "Arabic",
    de: "German",
    es: "Spanish",
    fr: "French",
    ja: "Japanese",
    la: "Latin",
    ru: "Russian",
    zh: "Chinese",
};


interface LanguageState {
    language: LanguagesSupported;
    setLanguage: (language: LanguagesSupported) => void;
    getLanguages: (isPro: boolean) => LanguagesSupported[];
    getNotSupportedLanguages: (isPro: boolean) => LanguagesSupported[];
}

export const useLanguageStore = create<LanguageState>((set , get) => ({
    language: "en",
    setLanguage: (language: LanguagesSupported) => set({ language }),

    getLanguages: (isPro: boolean) => {
        if(isPro) return Object.keys(LanguageSupportedMap) as LanguagesSupported[];

        return Object.keys(LanguageSupportedMap).slice(0,2) as LanguagesSupported[];
    },

    getNotSupportedLanguages: (isPro: boolean) => {
        if(isPro) return [];

        return Object.keys(LanguageSupportedMap).slice(2) as LanguagesSupported[];
    }
}));

interface SubscriptionState {
    subscription: Subscription | null | undefined;
    setSubcription: (subscription: Subscription | null | undefined) => void;
}

export const useSubscriptionStore = create<SubscriptionState>((set) => ({
    subscription: undefined,
    setSubcription: (subscription: Subscription | null | undefined) => set({ subscription }),
})); 