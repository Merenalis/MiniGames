import React, {useCallback, useContext, useEffect, useState} from 'react';
import app, {db} from '../firebase/config'
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../firebase/Auth";
import { getDoc,doc } from "firebase/firestore";
import Header from "../components/Header";

const Home = () => {
    let navigate = useNavigate();
    const currentUser = useContext(AuthContext);
    const [userData,setUserData] = useState(null)
    const [pending, setPending] = useState(false);

    useEffect( () => {
        try {
            async function fetchData() {
                setPending(true)
                const docRef = doc(db, "users", currentUser.uid);

                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setUserData(docSnap.data())
                    setPending(false)
                } else {
                    console.log("Document does not exist")
                }
            }

            if(currentUser)
                fetchData()



        } catch (error) {
            console.log(error)
        }
    },[])

    if(pending){
        return <>Loading...</>
    }
    return (
        <div>
            <Header userData={userData}/>
            Home
        </div>
    );
};

export default Home;