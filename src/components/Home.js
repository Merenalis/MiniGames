import React from 'react';
import app from '../firebase/config'
const Home = () => {
    return (
        <div>
            Home
            <button onClick={()=>app.auth().signOut()}>Sign out</button>
        </div>
    );
};

export default Home;