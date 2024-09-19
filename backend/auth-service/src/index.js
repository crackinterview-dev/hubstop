import express from 'express';
import session from 'express-session';
import passport from 'passport';
import dotenv from 'dotenv';
import { setupPassportRoutes } from './config/passport.js'; // Import the route setup
import authRoutes from './routes/authRoutes.js'; // Import your authentication routes

dotenv.config();
const app = express();

// Middleware setup
app.use(express.json()); // To parse JSON bodies
app.use(session({ 
    secret: process.env.SESSION_SECRET, 
    resave: false, 
    saveUninitialized: true 
}));
app.use(passport.initialize());
app.use(passport.session());

// Set up passport routes
setupPassportRoutes(app); // Call this after initializing the app

// Use your authentication routes
app.use('/auth', authRoutes); // Ensure this line is added

// New route to get the user profile
app.get('/profile', (req, res) => {
    if (req.isAuthenticated()) {
        // Send back user data
        res.json({ id: req.user.id, name: req.user.name, email: req.user.email });
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
