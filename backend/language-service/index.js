import express, { json } from "express";
import languageRoutes from "./src/routes/languageRoutes.js"; // Use import instead of require

const app = express();
const port = process.env.PORT || 5000;

// Middleware and routes
app.use(json());
app.use("/api/language", languageRoutes);

app.listen(port, () => {
  console.log(`Language service running on port ${port}`);
});
