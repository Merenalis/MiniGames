import React, {useCallback, useContext} from 'react';
import app from '../firebase/config'
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../firebase/Auth";
const Home = () => {
    let navigate = useNavigate();
    const currentUser = useContext(AuthContext);

    const logout = useCallback(async event => {
        event.preventDefault()
        try {
            await app.auth().signOut()
            navigate('/login', {replace: true})
        } catch (e) {
            alert(e)
        }
    }, [navigate])
    return (
        <div>
            Home
            <br/>
            {currentUser ? 'UserName ID: '+ currentUser.uid : null}
            <br/>
            <button onClick={logout}>Sign out</button>
        </div>
    );
};

export default Home;