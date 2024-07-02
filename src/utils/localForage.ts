import localforage from 'localforage';

export const setupInitialData = async () => {
    const admin = {
        id: 'admin',
        username: 'admin',
        password: 'admin',
        roleType: 'admin',
        name: 'Admin User',
        address: '123 Admin St',
        phoneNumber: '123-456-7890'
    };

    const users = Array.from({ length: 5 }, (_, i) => ({
        id: `user${i + 1}`,
        username: `user${i + 1}`,
        password: `user${i + 1}`,
        roleType: 'user',
        name: `User ${i + 1}`,
        address: `123 User ${i + 1} St`,
        phoneNumber: `123-456-78${90 + i}`
    }));

    await localforage.setItem('users', [admin, ...users]);
};
