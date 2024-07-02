import { useState } from 'react';
import localforage from 'localforage';
import { User } from '../types';

export const useRegister = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const register = async (newUser: User, adminCount: number) => {
        setLoading(true);
        setError(null);

        try {
            const users = await localforage.getItem<User[]>('users') || [];
            const exists = users.some(user => user.username === newUser.username);

            if (exists) {
                setError('Username already exists');
                setLoading(false);
                throw new Error('Username already exists');
            }

            if (newUser.roleType === 'admin' && adminCount >= 1) {
                throw new Error('Only one admin is allowed');
            }

            users.push(newUser);
            await localforage.setItem('users', users);

            setLoading(false);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError(String(err));
            }
            setLoading(false);
            throw err; 
        }
    };

    return { register, loading, error };
};
