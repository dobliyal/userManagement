import React from 'react';
import { useForm } from '../hooks/useForm';
import { useRegister } from '../hooks/useRegister';
import { useNavigate } from 'react-router-dom';
import { RegisterForm } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { v4 as uuidv4 } from 'uuid'; 

const RegisterPage: React.FC = () => {
    const { register, loading, error } = useRegister();
    const { adminCount } = useAuth(); 
    const navigate = useNavigate();

    const { values, handleChange } = useForm<RegisterForm>({
        username: '',
        password: '',
        roleType: 'user',
        name: '',
        address: '',
        phoneNumber: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newUser = { ...values, id: uuidv4() }; 
        try {
            await register(newUser, adminCount);
            navigate('/login');
        } catch (err) {
            console.error('Registration error:', err);
        }
    };

    return (
        <div>
            <h2>Register</h2>
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
                <div>
                    <label>Name</label>
                    <input name="name" value={values.name} onChange={handleChange} required />
                </div>
                <div>
                    <label>Address</label>
                    <input name="address" value={values.address} onChange={handleChange} required />
                </div>
                <div>
                    <label>Phone Number</label>
                    <input name="phoneNumber" value={values.phoneNumber} onChange={handleChange} required />
                </div>
                <button type="submit" disabled={loading}>Register</button>
            </form>
        </div>
    );
};

export default RegisterPage;
