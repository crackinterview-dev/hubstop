// routes/languageRoutes.js
import express from "express";
import { getTranslations } from "../controllers/languageController.js"; // Ensure correct file extension

const router = express.Router();

// Define routes
router.get("/:lng", getTranslations);

export default router;
