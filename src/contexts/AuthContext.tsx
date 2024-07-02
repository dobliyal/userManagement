import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import localforage from 'localforage';
import { User, AuthContextType } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [adminCount, setAdminCount] = useState<number>(0);

    useEffect(() => {
        const fetchUser = async () => {
            const storedUser = await localforage.getItem<User>('user');
            if (storedUser) setUser(storedUser);
            setLoading(false);
        };
        fetchUser();
    }, []);

    useEffect(() => {
        const fetchAdminCount = async () => {
            const users = await localforage.getItem<User[]>('users') || [];
            const adminCount = users.filter(user => user.roleType === 'admin').length;
            setAdminCount(adminCount);
        };
        fetchAdminCount();
    }, []);

    const login = (username: string, password: string, roleType: 'admin' | 'user') => {
        return new Promise<void>((resolve, reject) => {
            setTimeout(async () => {
                const users = await localforage.getItem<User[]>('users') || [];
                const foundUser = users.find(user => user.username === username && user.password === password && user.roleType === roleType);
                if (foundUser) {
                    setUser(foundUser);
                    await localforage.setItem('user', foundUser);
                    resolve();
                } else {
                    reject('Invalid credentials');
                }
            }, 2000);
        });
    };

    const logout = async () => {
        await localforage.removeItem('user');
        setUser(null);
    };

    const register = async (newUser: User) => {
        if (newUser.roleType === 'admin' && adminCount >= 1) {
            throw new Error('Only one admin is allowed');
        }
        const users = await localforage.getItem<User[]>('users') || [];
        users.push(newUser);
        await localforage.setItem('users', users);
        if (newUser.roleType === 'admin') {
            setAdminCount(adminCount + 1);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading, register, adminCount }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
