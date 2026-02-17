import React, { createContext, useContext, useState, useEffect } from 'react';

const PersonaContext = createContext();

export const PERSONAS = {
    AGENCY: 'Agency',
    MEDIA_OWNER: 'Media Owner',
};

export const PersonaProvider = ({ children }) => {
    const [persona, setPersona] = useState(() => {
        return localStorage.getItem('userPersona') || PERSONAS.AGENCY;
    });

    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('appUser');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    useEffect(() => {
        localStorage.setItem('userPersona', persona);
    }, [persona]);

    useEffect(() => {
        if (user) {
            localStorage.setItem('appUser', JSON.stringify(user));
        } else {
            localStorage.removeItem('appUser');
        }
    }, [user]);

    const togglePersona = () => {
        setPersona((prev) =>
            prev === PERSONAS.AGENCY ? PERSONAS.MEDIA_OWNER : PERSONAS.AGENCY
        );
    };

    const login = (userData) => {
        setUser(userData);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('appUser');
    };

    return (
        <PersonaContext.Provider value={{ persona, setPersona, togglePersona, user, login, logout }}>
            {children}
        </PersonaContext.Provider>
    );
};

export const usePersona = () => {
    const context = useContext(PersonaContext);
    if (!context) {
        throw new Error('usePersona must be used within a PersonaProvider');
    }
    return context;
};
