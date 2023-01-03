import React, {useCallback} from 'react';
import app from "../firebase/config";
import {Link as LinkRouter, useNavigate} from "react-router-dom";
import {Box, Button, Container, CssBaseline, Grid, TextField, Typography} from "@mui/material";

const SignUp = () => {
    let navigate = useNavigate();

    const handleSignUp = useCallback(async event =>{
        event.preventDefault()
        const {email,password} = event.target.elements;
        try {
            await app
                .auth()
                .createUserWithEmailAndPassword(email.value,password.value);
            navigate('/login', { replace: true })
        } catch (e) {
            alert(e)
        }
    },[navigate])
    return (
        <div>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" onSubmit={handleSignUp} noValidate sx={{mt: 1}}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Name"
                            name="username"
                            autoComplete="username"
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
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Sign Up
                        </Button>
                        <Grid container
                              justifyContent="center">
                            <Grid item>
                                <Typography>
                                    {"Already have an account? "}
                                    <LinkRouter to= "/login">Login</LinkRouter>
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>

        </div>
    );
};

export default SignUp;