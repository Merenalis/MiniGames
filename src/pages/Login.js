import React, {useCallback, useContext, useEffect, useState} from 'react';
import app from "../firebase/config";
import {AuthContext} from "../firebase/Auth";
import {useNavigate, Link as LinkRouter} from "react-router-dom";
import {
    Box,
    Button,
    Container,
    CssBaseline,
    Grid,
    TextField,
    Typography
} from "@mui/material";
import CustomAlert from "../components/CustomAlert";

const Login = () => {
    let navigate = useNavigate();
    const currentUser = useContext(AuthContext);
    const [alertState, setAlertState] = useState({
        show: false,
        type: 'success',
        text: ''
    })

    useEffect(() => {
        if (currentUser)
            navigate('/', {replace: true})
    }, [])

    const handleLogin = useCallback(async event => {
        event.preventDefault()
        const {email, password} = event.target.elements;
        try {
            await app
                .auth()
                .signInWithEmailAndPassword(email.value, password.value);
            setAlertState({
                ...alertState, show: true, text: 'You are logged in successfully!'
            })
            setTimeout(() => {
                navigate('/', {replace: true})
            }, 2000)
        } catch (e) {
            let text = ''
            if (e.code === 'auth/user-not-found')
                text = 'There is no user with this credentials'
            else if (e.code === 'auth/invalid-email')
                text = 'Enter correct email address'
            else if (e.code === 'auth/invalid-password')
                text = 'Enter correct password, it should be larger than 6 symbols'

            setAlertState({
                ...alertState, show: true, text: text, type: 'error'
            })
        }
    }, [navigate])

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
                                    <LinkRouter to="/signup">Sign Up</LinkRouter>
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <CustomAlert alert={alertState}/>
            </Container>
        </div>
    );
};

export default Login;