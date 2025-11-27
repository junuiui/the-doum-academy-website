"use client"

import { createContext, useContext, useState } from 'react'

// Setting up the type for all available Languages
type Lang = "en" | "ko"

// set up context type
type LangContextType = {
    lang: Lang;
    toggleLang: () => void;
};

const LanguageContext = createContext<LangContextType | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [lang, setLang] = useState<Lang>("en")

    /**
     * When toggle, it changes the current language
     */
    const toggleLang = () => {
        console.log(`[Language] ${lang}`)
        setLang((prev) => (prev === 'en' ? 'ko' : 'en'));
    };

    return (
        <LanguageContext.Provider value={{ lang, toggleLang }}>
            {children}
        </LanguageContext.Provider>
    )
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) throw new Error("ERROR: useLanguage must be used inside Language Provider!!")
    return context;
}