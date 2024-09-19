import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Check if DB_URL is defined
if (!process.env.DB_URL) {
  throw new Error('Database URL is not defined in the environment variables');
}

const sequelize = new Sequelize(process.env.DB_URL, {
  // Add your Sequelize options here
  // e.g., logging: false,
});

// Test the database connection
sequelize.authenticate()
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });

export default sequelize;
