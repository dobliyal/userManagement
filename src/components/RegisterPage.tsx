import React, { ChangeEvent, useState } from 'react';
import { useForm } from '../hooks/useForm';
import { useRegister } from '../hooks/useRegister';
import { useNavigate } from 'react-router-dom';
import { RegisterForm } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { v4 as uuidv4 } from 'uuid';
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


const RegisterPage: React.FC = () => {
    const { register, error } = useRegister();
    const { adminCount, userCount } = useAuth();
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { values, handleChange, setValues } = useForm<RegisterForm>({
        username: '',
        password: '',
        roleType: 'user',
        name: '',
        address: '',
        phoneNumber: ''
    });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        handleChange(e);
    };

    const handleSelectChange = (e: ChangeEvent<{ name?: string | undefined; value: unknown }>) => {
        const { name, value } = e.target;
        setValues({ ...values, [name as string]: value as string });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        const newUser = { ...values, id: uuidv4() };
        try {
            await new Promise((resolve) => setTimeout(resolve, 2000)); 
            await register(newUser, adminCount, userCount);
            navigate('/login');
        } catch (err) {
            console.error('Registration error:', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" component="h1" gutterBottom>
                Register
            </Typography>
            {error && <Alert severity="error">{error}</Alert>}
            {isSubmitting && (
                <Box display="flex" justifyContent="center" mb={2}>
                    <CircularProgress />
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
                        <InputLabel id="role-label" style={{ backgroundColor: 'white' }}>Role</InputLabel>
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
                    <Button type="submit" variant="contained" color="primary" fullWidth >
                        Register
                    </Button>
                </form>
            )}
        </Container>
    );
};

export default RegisterPage;
