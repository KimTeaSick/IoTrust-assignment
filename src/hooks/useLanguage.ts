import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

export const useLanguage = () => {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState<"ko" | "en">("ko");

  useEffect(() => {
    const browserLang = navigator.language.toLowerCase();
    const detectedLang = browserLang.startsWith("en") ? "en" : "ko";
    setLanguage(detectedLang);

    if (i18n && typeof i18n.changeLanguage === "function") {
      i18n.changeLanguage(detectedLang);
    }
  }, []);

  const toggleLanguage = () => {
    const newLang = language === "ko" ? "en" : "ko";
    setLanguage(newLang);
    if (i18n && typeof i18n.changeLanguage === "function") {
      i18n.changeLanguage(newLang);
    }
  };

  const getDescription = (item: any) => {
    if (language === "en" && item.en_description) {
      return item.en_description;
    }
    return item.ko_description || item.en_description || "";
  };

  return { language, toggleLanguage, getDescription };
};
