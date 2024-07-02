import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useForm } from '../hooks/useForm';
import { useNavigate } from 'react-router-dom';
import { LoginForm } from '../types';

const LoginPage: React.FC = () => {
    const { login, user, loading } = useAuth();
    const { values, handleChange } = useForm<LoginForm>({ username: '', password: '', roleType: 'user' });
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await login(values.username, values.password, values.roleType);
            if (values.roleType === 'admin') {
                navigate('/user-list');
            } else {
                navigate(`/profile/${user?.id}`);
            }
        } catch (err) {
            setError(err as string);
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            <h2>Login</h2>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username</label>
                    <input name="username" value={values.username} onChange={handleChange} required />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" name="password" value={values.password} onChange={handleChange} required />
                </div>
                <div>
                    <label>Role</label>
                    <select name="roleType" value={values.roleType} onChange={handleChange}>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginPage;
