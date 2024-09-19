import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GitHubStrategy } from 'passport-github2';
import { Strategy as LinkedInStrategy } from 'passport-linkedin-oauth2';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config(); // Load environment variables from .env file

// Mock User Model (for demonstration purposes)
const users = [];

// Google Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:5001/auth/google/callback',
    scope: ['profile', 'email']
}, (accessToken, refreshToken, profile, done) => {
    try {
        const user = users.find(u => u.googleId === profile.id);
        if (user) {
            return done(null, user);
        } else {
            const newUser = {
                id: users.length + 1,
                googleId: profile.id,
                email: profile.emails[0]?.value,
                name: profile.displayName
            };
            users.push(newUser);
            return done(null, newUser);
        }
    } catch (error) {
        return done(error);
    }
}));

// Function to set up authentication routes
export const setupPassportRoutes = (app) => {
    // Route to initiate Google authentication
    app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

    // Google callback route
    app.get('/auth/google/callback', 
        passport.authenticate('google', { session: false }), 
        (req, res) => {
            const token = generateToken(req.user); // Create a token for the user
            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
                sameSite: 'Strict'
            });
            res.redirect('http://localhost:5173/profile'); // Redirect to your frontend profile page
        }
    );
};



// Function to generate a JWT token (you can customize this as needed)
function generateToken(user) {
    return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
}

// Serialize user to session
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser((id, done) => {
    const user = users.find(u => u.id === id);
    done(null, user);
});

// GitHub Strategy
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: '/auth/github/callback',
    scope: ['user:email']
}, (accessToken, refreshToken, profile, done) => {
    try {
        const user = users.find(u => u.githubId === profile.id);
        if (user) {
            return done(null, user);
        } else {
            const newUser = {
                id: users.length + 1,
                githubId: profile.id,
                email: profile.emails[0]?.value,
                name: profile.displayName
            };
            users.push(newUser);
            return done(null, newUser);
        }
    } catch (error) {
        return done(error);
    }
}));

// LinkedIn Strategy
passport.use(new LinkedInStrategy({
    clientID: process.env.LINKEDIN_CLIENT_ID,
    clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
    callbackURL: '/auth/linkedin/callback',
    scope: ['r_emailaddress', 'r_liteprofile']
}, (accessToken, refreshToken, profile, done) => {
    try {
        const user = users.find(u => u.linkedinId === profile.id);
        if (user) {
            return done(null, user);
        } else {
            const newUser = {
                id: users.length + 1,
                linkedinId: profile.id,
                email: profile.emails[0]?.value,
                name: profile.displayName
            };
            users.push(newUser);
            return done(null, newUser);
        }
    } catch (error) {
        return done(error);
    }
}));
