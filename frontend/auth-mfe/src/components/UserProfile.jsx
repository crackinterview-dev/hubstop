// src/UserProfile.js

import React, { useEffect, useState } from 'react';

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch user profile data after authentication
        fetch('/profile', { credentials: 'include' }) // Ensure cookies are included
            .then(response => {
                if (!response.ok) {
                    throw new Error('Unauthorized');
                }
                return response.json();
            })
            .then(data => {
                setUser(data);
            })
            .catch(err => {
                console.error('Error fetching profile:', err);
                setError(err.message);
            });
    }, []);

    return (
        <div>
            <h1>User Profile</h1>
            {error ? (
                <p>{error}</p>
            ) : (
                user ? <div>{user.name} ({user.email})</div> : <p>Loading...</p>
            )}
        </div>
    );
};

export default UserProfile;
