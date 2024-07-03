import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useAuth } from '../contexts/AuthContext';
const Navbar = () => {
  const { user, logout } = useAuth();
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          User Management App
        </Typography>
        {user && user.roleType === 'admin' && (
          <Button color="inherit" component={Link} to="/user-list">
            User List
          </Button>
        )}
        {user && (
          <Button color="inherit" component={Link} to={`/profile/${user.id}`}>
            Profile
          </Button>
        )}
        {!user ? (
          <>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/register">
              Register
            </Button>
          </>
        ) : (
          <Button color="inherit" onClick={logout}>
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};
export default Navbar;










