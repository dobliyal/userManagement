import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useAuth } from '../contexts/AuthContext';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

const StyledAppBar = styled(AppBar)({
  backgroundImage: 'url(/path/to/your/background.jpg)', // Add a background image
  backgroundSize: 'cover',
  backgroundPosition: 'center',
});

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  return (
    <StyledAppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          User Management App
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
              {location.pathname !== '/register' && (
                <Button color="inherit" component={Link} to="/register">
                  Register
                </Button>
              )}
            </>
          ) : (
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          )}
        </Box>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Navbar;
