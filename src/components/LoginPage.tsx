import React, { useState, useEffect, ChangeEvent } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useForm } from '../hooks/useForm';
import { useNavigate } from 'react-router-dom';
import { LoginForm } from '../types';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';


const LoginPage: React.FC = () => {
    const { login, user, loading } = useAuth();
    const { values, handleChange, setValues } = useForm<LoginForm>({ username: '', password: '', roleType: 'user' });
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        handleChange(e);
    };

    const handleSelectChange = (e: ChangeEvent<{ name?: string; value: unknown }>) => {
        const { name, value } = e.target;
        setValues({ ...values, [name as string]: value as string });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await new Promise((resolve) => setTimeout(resolve, 2000)); 
            await login(values.username, values.password, values.roleType);
        } catch (err) {
            setError(err as string);
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        if (user) {
            if (user.roleType === 'admin') {
                navigate('/user-list');
            } else {
                navigate(`/profile/${user.id}`);
            }
        }
    }, [user, navigate]);

    if (loading) return <p>Loading...</p>;

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" component="h1" gutterBottom>
                Login
            </Typography>
            {error && <Alert severity="error">{error}</Alert>}
            {isSubmitting && (
                <Box display="flex" justifyContent="center" mb={2}>
                    <CircularProgress />
                    <Typography variant="body1" style={{ marginLeft: '10px' }}>
                        Loading...
                    </Typography>
                </Box>
            )}
            {!isSubmitting && (
                <form onSubmit={handleSubmit}>
                    <Box mb={2}>
                        <TextField
                            fullWidth
                            label="Username"
                            name="username"
                            value={values.username}
                            onChange={handleInputChange}
                            required
                        />
                    </Box>
                    <Box mb={2}>
                        <TextField
                            fullWidth
                            type="password"
                            label="Password"
                            name="password"
                            value={values.password}
                            onChange={handleInputChange}
                            required
                        />
                    </Box>
                    <Box mb={2}>
                        <FormControl fullWidth>
                            <InputLabel id="role-label">Role</InputLabel>
                            <Select
                                labelId="role-label"
                                name="roleType"
                                value={values.roleType}
                                onChange={(e) => handleSelectChange(e as ChangeEvent<{ name?: string; value: unknown }>)}
                                required
                            >
                                <MenuItem value="user">User</MenuItem>
                                <MenuItem value="admin">Admin</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <Button type="submit" variant="contained" color="primary" fullWidth >
                        Login
                    </Button>
                </form>
            )}
        </Container>
    );
};

export default LoginPage;
