import React, {useCallback} from 'react';
import app from "../firebase/config";
import {useNavigate} from "react-router-dom";

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
            <h1>SignUp</h1>
            <form onSubmit={handleSignUp}>
                <input type="text" name="email" placeholder="email"/>
                <input type="text" name="password" placeholder="password"/>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default SignUp;