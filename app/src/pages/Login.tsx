import React, { useState } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Container, 
  CssBaseline 
} from '@mui/material';
import axiosPublic from '../ctx/axiosPublic';
import { useUser } from '../context/UserContext';
import Register from './Register'; // Import the Register component

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const { setUser } = useUser();

  const [showRegister, setShowRegister] = useState(false);

  const handleRegisterClick = () => {
    setShowRegister(true);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    

    axiosPublic.post('token/', formData)
      .then((response: { data: any; }) => {
        console.log('Login successful:', response.data);
        localStorage.setItem('token', response.data.access);
        localStorage.setItem('refresh', response.data.refresh);
        localStorage.setItem('user', JSON.stringify(response.data));

        setUser(response.data);
      })
      .catch((error: any) => {
        console.error('Login failed:', error);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      {!showRegister ? (
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Log in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Button
              onClick={handleRegisterClick}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
          </Box>
        </Box>
      ) : (
        <Register />
      )}
    </Container>
  );
};

export default Login;
