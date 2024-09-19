/* eslint-disable no-unused-vars */
// src/components/LanguageSwitcher.jsx
import React from "react";
import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div>
      <button onClick={() => handleLanguageChange("en")}>English</button>
      <button onClick={() => handleLanguageChange("fr")}>French</button>
      <button onClick={() => handleLanguageChange("ar")}>Arabic</button>
    </div>
  );
};

export default LanguageSwitcher;
