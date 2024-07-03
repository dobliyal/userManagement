import React, { useEffect, useState } from 'react';
import localforage from 'localforage';
import { User } from '../types';
import { Link } from 'react-router-dom';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';


const UserListPage: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const fetchedUsers = await localforage.getItem<User[]>('users') || [];
            setUsers(fetchedUsers);
        };
        fetchUsers();
    }, []);

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" component="h1" gutterBottom>
                User List
            </Typography>
            <List>
                {users.map(user => (
                    <ListItem key={user.id}>
                        <ListItemText primary={user.username} />
                        <Box ml={2}>
                            <Button
                                component={Link}
                                to={`/profile/${user.id}`}
                                variant="contained"
                                color="primary"
                            >
                                Edit
                            </Button>
                        </Box>
                    </ListItem>
                ))}
            </List>
        </Container>
    );
};

export default UserListPage;
