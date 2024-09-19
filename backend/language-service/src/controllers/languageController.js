// controllers/languageController.js
import { getTranslationsByLanguage } from "../services/languageService.js";
import { info, warn, error } from "../utils/logger.js";

const getTranslations = async (req, res) => {
  const { lng } = req.params;

  try {
    info(`Fetching translations for language: ${lng}`);
    const translations = await getTranslationsByLanguage(lng);

    if (!translations) {
      warn(`No translations found for language: ${lng}`);
      return res.status(404).json({ message: "Translations not found" });
    }

    info(`Translations fetched for language: ${lng}`);
    return res.json(translations);
  } catch (err) {
    error(`Error fetching translations for language: ${lng}`, err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Named export for getTranslations
export { getTranslations };
