import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Cookies from 'js-cookie';
import axios from 'axios';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="#">
        Bar Boss
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {

   const [ firstName, setFirstName ] = useState("");
   const [ lastName, setLastName ] = useState("");
   const [ email, setEmail ] = useState("");
   const [ phone, setPhone ] = useState("");
   const [ establishment, setEstablishment ] = useState("");
   const [ password, setPassword ] = useState("");
   const [ confirmPassword, setConfirmPassword ] = useState("");
   const [ errors, setErrors ] = useState([]);
   const navigate = useNavigate();

   useEffect(() => {
      if (Cookies.get('usertoken')) {
          navigate('/dashboard');
      }
   }, [])

  const registerUser = (e) => {
      e.preventDefault();

      axios.post('http://localhost:8000/api/users/register', {
         firstName, lastName, email, phone, establishment, password, confirmPassword
      }, { withCredentials: true })
          .then(() => {
              navigate('/dashboard');
          })
          .catch(err => {
              setErrors(err.response.data.errors);
          })
      }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={registerUser} sx={{ mt: 3 }}>
            {errors.firstName ? <div className="text-danger ms-4">* {errors.firstName.message}</div> : null}
            {errors.lastName ? <div className="text-danger ms-4">* {errors.lastName.message}</div> : null}
            {errors.email ? <div className="text-danger ms-4">* {errors.email.message}</div> : null}
            {errors.phone ? <div className="text-danger ms-4">* {errors.phone.message}</div> : null}
            {errors.establishment ? <div className="text-danger ms-4">* {errors.establishment.message}</div> : null}
            {errors.password ? <div className="text-danger ms-4">* {errors.password.message}</div> : null}
            {errors.confirmPassword ? <div className="text-danger ms-4">* {errors.confirmPassword.message}</div> : null}
            <Grid container spacing={2} sx={{ marginTop: "8px" }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="phone"
                  required
                  fullWidth
                  id="phone"
                  label="Phone Number"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="123-456-7890"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="establishment"
                  label="Establishment Name"
                  name="establishment"
                  value={establishment}
                  onChange={e => setEstablishment(e.target.value)}
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Password"
                  type="password"
                  id="confirmPassword"
                  autoComplete="confirm-password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}