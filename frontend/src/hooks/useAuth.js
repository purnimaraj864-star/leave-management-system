import { useState, useEffect } from 'react';
import { getCurrentUser } from '../services/authService';

// Custom hook to access logged in user and authentication status
export const useAuth = () => {
    const [user, setUser] = useState(getCurrentUser());

    useEffect(() => {
        // Keep in sync with localStorage
        const handleStorageChange = () => {
            setUser(getCurrentUser());
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    const isAuthenticated = !!user;
    const isAdmin = user?.role === 'admin';

    return {
        user,
        setUser,
        isAuthenticated,
        isAdmin
    };
};
