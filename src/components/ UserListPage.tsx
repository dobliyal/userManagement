import React, { useEffect, useState } from 'react';
import localforage from 'localforage';
import { User } from '../types';
import { Link } from 'react-router-dom';

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
        <div>
            <h2>User List</h2>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        <Link to={`/profile/${user.id}`}>{user.username}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserListPage;
