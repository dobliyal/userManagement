import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import ProfilePage from './components/ProfilePage';
import UserListPage from './components/ UserListPage';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Navbar from './components/Navbar';

const App: React.FC = () => {
    return (
        <AuthProvider>
            <Router>
              <Navbar/>
                <Routes>
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route
                        path="/profile/:id"
                        element={
                            <PrivateRoute>
                                <ProfilePage />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/user-list"
                        element={
                            <AdminRoute>
                                <UserListPage />
                            </AdminRoute>
                        }
                    />
                    <Route path="*" element={<Navigate to="/register" />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

const PrivateRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
    const { user } = useAuth();
    return user ? children : <Navigate to="/login" />;
};

const AdminRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
    const { user } = useAuth();
    return user && user.roleType === 'admin' ? children : <Navigate to="/login" />;
};

export default App;
