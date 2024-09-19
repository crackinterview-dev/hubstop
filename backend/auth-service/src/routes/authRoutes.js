import { Router } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { hash } from 'bcrypt';

const { sign } = jwt;
const router = Router();

// Local sign-up
router.post('/signup', async (req, res) => {
    const { email, password, name } = req.body;

    // Basic validation
    if (!email || !password || !name) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const hashedPassword = await hash(password, 10);
        
        // In a real app, save the user to a database
        const user = { id: Date.now(), email, name, password: hashedPassword };
        
        // Generate JWT
        const token = sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Google Authentication
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('http://localhost:5001/auth/google/callback', passport.authenticate('google', { session: false }), (req, res) => {
    const token = sign({ id: req.user.id, email: req.user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user: req.user });
});

// GitHub Authentication
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

router.get('/github/callback', passport.authenticate('github', { session: false }), (req, res) => {
    const token = sign({ id: req.user.id, email: req.user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user: req.user });
});

// LinkedIn Authentication
router.get('/linkedin', passport.authenticate('linkedin', { state: 'SOME_STATE' }));

router.get('/linkedin/callback', passport.authenticate('linkedin', { session: false }), (req, res) => {
    const token = sign({ id: req.user.id, email: req.user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user: req.user });
});

export default router;
