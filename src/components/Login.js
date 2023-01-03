import React, {useCallback, useContext, useEffect} from 'react';
import app from "../firebase/config";
import {AuthContext} from "../firebase/Auth";
import {redirect, useNavigate,Link as LinkRouter} from "react-router-dom";
import {
    Avatar,
    Box,
    Button,
    Checkbox,
    Container,
    CssBaseline,
    FormControlLabel, Grid, Link,
    TextField,
    Typography
} from "@mui/material";

const Login = () => {
    let navigate = useNavigate();
    const currentUser = useContext(AuthContext);

    const handleLogin = useCallback(async event => {
        event.preventDefault()
        const {email, password} = event.target.elements;
        try {
            await app
                .auth()
                .signInWithEmailAndPassword(email.value, password.value);
            navigate('/', {replace: true})
        } catch (e) {
            alert(e)
        }
    }, [navigate])
    useEffect(() => {
        if (currentUser)
            navigate('/', {replace: true})

    }, [currentUser, navigate])


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
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleLogin} noValidate sx={{mt: 1}}>
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
                            Sign In
                        </Button>
                        <Grid container
                              justifyContent="center">
                            <Grid item>
                                <Typography>
                                    {"Don't have an account? "}
                                    <LinkRouter to= "/signup">Sign Up</LinkRouter>
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </div>
    );
};

export default Login;