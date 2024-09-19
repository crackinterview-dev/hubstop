// src/components/AuthContainer.js
import React from 'react';
import SignupForm from './SignupForm';
import SocialLoginButtons from './SocialLoginButtons';
import './SignupForm.css';

const AuthContainer = () => {
    return (
        <div className="auth-container">
            <SignupForm />
            <SocialLoginButtons />
        </div>
    );
};

export default AuthContainer;
