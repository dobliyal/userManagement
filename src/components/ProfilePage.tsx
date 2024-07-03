import React, { useEffect, useState, ChangeEvent } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useForm } from '../hooks/useForm';
import localforage from 'localforage';
import { User, ProfileForm } from '../types';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const ProfilePage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { user } = useAuth();
    const [profile, setProfile] = useState<User | null>(null);
    const { values, handleChange, setValues } = useForm<ProfileForm>({
        username: '',
        roleType: 'user',
        name: '',
        address: '',
        phoneNumber: ''
    });

    useEffect(() => {
        const fetchProfile = async () => {
            const users = await localforage.getItem<User[]>('users') || [];
            const foundUser = users.find(u => u.id === id);
            if (foundUser) {
                setProfile(foundUser);
                setValues({
                    username: foundUser.username,
                    roleType: foundUser.roleType,
                    name: foundUser.name,
                    address: foundUser.address,
                    phoneNumber: foundUser.phoneNumber
                });
            }
        };
        fetchProfile();
    }, [id, setValues]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        handleChange(e);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const users = await localforage.getItem<User[]>('users') || [];
        const updatedUsers = users.map(u => u.id === id ? { ...u, ...values } : u);
        await localforage.setItem('users', updatedUsers);
        setProfile({ ...profile, ...values } as User);
    };


    return (
        <Container maxWidth="sm">
            <Typography variant="h4" component="h1" gutterBottom>
                Profile
            </Typography>
            <form onSubmit={handleSubmit}>
                <Box mb={2}>
                    <TextField
                        fullWidth
                        label="Username"
                        name="username"
                        value={values.username}
                        onChange={handleInputChange}
                        disabled
                    />
                </Box>
                <Box mb={2}>
                    <TextField
                        fullWidth
                        label="Role"
                        name="roleType"
                        value={values.roleType}
                        onChange={handleInputChange}
                        disabled
                    />
                </Box>
                <Box mb={2}>
                    <TextField
                        fullWidth
                        label="Name"
                        name="name"
                        value={values.name}
                        onChange={handleInputChange}
                        required
                    />
                </Box>
                <Box mb={2}>
                    <TextField
                        fullWidth
                        label="Address"
                        name="address"
                        value={values.address}
                        onChange={handleInputChange}
                        required
                    />
                </Box>
                <Box mb={2}>
                    <TextField
                        fullWidth
                        label="Phone Number"
                        name="phoneNumber"
                        value={values.phoneNumber}
                        onChange={handleInputChange}
                        required
                    />
                </Box>
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Save
                </Button>
            </form>
        </Container>
    );
};

export default ProfilePage;
