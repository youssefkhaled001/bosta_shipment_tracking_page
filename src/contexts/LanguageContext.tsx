import { useContext, createContext, useState, ReactNode} from "react";

type Language = "en" | "ar";

interface LanguageContextType {
    language: Language;
    setLanguage: React.Dispatch<React.SetStateAction<Language>>;
  }
const LanguageContext = createContext<LanguageContextType|undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const [language, setLanguage] = useState<Language>("en");
    return <LanguageContext.Provider value={{ language, setLanguage }}>
        {children}
    </LanguageContext.Provider>;
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
      throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
  };
  