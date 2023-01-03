import React, {useCallback, useContext, useEffect} from 'react';
import app from "../firebase/config";
import {AuthContext} from "../firebase/Auth";
import {redirect, useNavigate} from "react-router-dom";

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

    },[currentUser, navigate])


    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <input type="text" name="email" placeholder="email"/>
                <input type="text" name="password" placeholder="password"/>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;