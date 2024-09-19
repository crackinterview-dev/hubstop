// src/components/SocialLoginButtons.js
import React from 'react';
import { Button, Container, Typography } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

const SocialLoginButtons = () => {
    const BASE_URL = 'http://localhost:5001/auth'; // Base URL for auth routes

    const handleEmailLogin = () => {
        console.log("handleEmailLogin");
        window.location.href = `${BASE_URL}/`; // Redirect to email login route
    };

    const handleGoogleLogin = () => {
        window.location.href = `${BASE_URL}/google/callback`; // Redirect to Google auth route
    };

    const handleLinkedInLogin = () => {
        window.location.href = `${BASE_URL}/linkedin`; // Redirect to LinkedIn auth route
    };

    const handleGitHubLogin = () => {
        window.location.href = `${BASE_URL}/github`; // Redirect to GitHub auth route
    };

    return (
        <Container maxWidth="xs" style={{ textAlign: 'center', padding: '2rem' }}>
            <Typography variant="h6" gutterBottom>
                Or Sign Up With
            </Typography>
            <Button
                variant="contained"
                color="secondary"
                startIcon={<GoogleIcon />}
                fullWidth
                style={{ marginBottom: '1rem' }}
                onClick={handleGoogleLogin}
            >
                Google
            </Button>
            <Button
                variant="contained"
                color="primary"
                startIcon={<LinkedInIcon />}
                fullWidth
                style={{ marginBottom: '1rem' }}
                onClick={handleLinkedInLogin}
            >
                LinkedIn
            </Button>
            <Button
                variant="contained"
                color="default"
                startIcon={<GitHubIcon />}
                fullWidth
                onClick={handleGitHubLogin}
            >
                GitHub
            </Button>
        </Container>
    );
};

export default SocialLoginButtons;
