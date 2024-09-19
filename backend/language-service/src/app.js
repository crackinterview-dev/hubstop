const express = require('express');
const mongoose = require('mongoose');
const logger = require('./utils/logger');
const languageRoutes = require('./routes/languageRoutes');

const app = express();

// Database connection
mongoose.connect('mongodb://language-service-db:27017/languages', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => logger.info('Database connected'))
  .catch((err) => logger.error('Database connection failed', err));

// Middleware
app.use(express.json());

// Language API routes
app.use('/api/language', languageRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => logger.info(`Language service running on port ${PORT}`));
