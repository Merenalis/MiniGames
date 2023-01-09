import React, {useCallback, useState} from 'react';
import app, {db} from "../firebase/config";
import { doc, setDoc } from "firebase/firestore";
import {Link as LinkRouter, useNavigate} from "react-router-dom";
import {Box, Button, Container, CssBaseline, Grid, TextField, Typography} from "@mui/material";
import CustomAlert from "../components/CustomAlert";

const SignUp = () => {
    let navigate = useNavigate();
    const [alertState, setAlertState] = useState({
        show: false,
        type: 'success',
        text: ''
    })

    const handleSignUp = useCallback(async event =>{
        event.preventDefault()
        const {email,password,password2, username} = event.target.elements;

        if (username.value.length === 0){
            setAlertState({
                ...alertState, show: true, text: 'Your name must not be empty!', type: 'error'
            })
            return
        }
        else if (password.value !== password2.value){
            setAlertState({
                ...alertState, show: true, text: 'Fields with passwords must be identical', type: 'error'
            })
            return
        }
        try {

            const data = await app
                .auth()
                .createUserWithEmailAndPassword(email.value,password.value);
            await setDoc(doc(db, "users", data.user.uid), {name: username.value,favorites:[null]});
            setAlertState({
                ...alertState, show: true, text: 'You have created your account successfully!',type: 'success'
            })
            setTimeout(() => {
                navigate('/login', { replace: true })
            }, 2000)
        } catch (e) {
            let text = ''

            if (e.code === 'auth/user-not-found')
                text = 'There is no user with this credentials'
            else if (e.code === 'auth/invalid-email')
                text = 'Enter correct email address'
            else if (e.code === 'auth/invalid-password')
                text = 'Enter correct password, it should be larger than 6 symbols'
            else if (e.code === 'auth/email-already-in-use')
                text = 'Account with this email is already exist'
            setAlertState({
                ...alertState, show: true, text: text, type: 'error'
            })
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
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password2"
                            label="Confirm password"
                            type="password"
                            id="password2"
                            autoComplete="current-password2"
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
                <CustomAlert alert={alertState}/>
            </Container>

        </div>
    );
};

export default SignUp;