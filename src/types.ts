export interface User {
    id: string;
    username: string;
    password: string;
    roleType: 'admin' | 'user';
    name: string;
    address: string;
    phoneNumber: string;
}

export interface AuthContextType {
    user: User | null;
    login: (username: string, password: string, roleType: 'admin' | 'user') => Promise<void>;
    logout: () => Promise<void>;
    //loading: boolean;
    register: (newUser: User) => Promise<void>;
    adminCount: number; 
    userCount: number;
    
}

export interface RegisterForm {
    username: string;
    password: string;
    roleType: 'admin' | 'user';
    name: string;
    address: string;
    phoneNumber: string;
    // email: string;
}

export interface LoginForm {
    username: string;
    password: string;
    roleType: 'admin' | 'user';
}

export interface ProfileForm {
    username: string;
    roleType: "admin" | "user";
    name: string;
    address: string;
    phoneNumber: string;
}
