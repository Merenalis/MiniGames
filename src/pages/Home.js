import React, {useCallback, useContext, useEffect, useState} from 'react';
import app, {db} from '../firebase/config'
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../firebase/Auth";
import {getDoc, doc, collection, query, getDocs, setDoc} from "firebase/firestore";
import Header from "../components/Header";
import CategoriesSection from "../components/CategoriesSection";
import {Card, CardActionArea, CardContent, CardMedia, Grid, Typography} from "@mui/material";
import GameCard from "../components/GameCard";
import firebase from "firebase/compat/app";

const Home = () => {
    let navigate = useNavigate();
    const currentUser = useContext(AuthContext);
    const [userData, setUserData] = useState(null)
    const [gamesData, setGamesData] = useState(null)
    const [pending, setPending] = useState(true);

    async function fetchUsersData() {
        const docUser = doc(db, "users", currentUser.uid);
        const docSnapUsers = await getDoc(docUser);

        if (docSnapUsers.exists()) {
            await setUserData(docSnapUsers.data())
        } else {
            console.log("Document does not exist")
        }
    }

    async function fetchGamesData() {
        const collectionGames = query(collection(db, "games"));
        const querySnapshot = await getDocs(collectionGames);
        setGamesData(querySnapshot.docs)
    }

    useEffect(() => {
        try {
            if (currentUser)
                fetchUsersData()
            fetchGamesData()
                .then(() => {
                    setPending(false)
                })


        } catch (error) {
            console.log(error)
        }
    }, [])

    if (pending) {
        return <>Loading...</>
    }

    async function functHui() {
        const citiesRef = collection(db, "games");
        await setDoc(doc(citiesRef), {
            name: "SCRAP METAL 3: INFERNAL TRAP",
            category_id: 6,
            description: "You can explore treacherous mountainsides or kick up tons of dust in dry lake beds in this gorgeous 3D driving game. A huge map is waiting for you and you can head in any direction " +
                "you feel like. The choice is yours but be careful, otherwise your car will get totally trashed.",
            image: 'https://images.crazygames.com/games/scrap-metal-3-infernal-trap/thumb-1555951535646.png?auto=format,compress&q=75&cs=strip',
            rating: '5',
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
    }

    return (
        <div>
            <Header userData={userData}/>
            {/*Home*/}
            {/*<button onClick={functHui}>click</button>*/}
            <br/>
            <div className='home-content'>

                <CategoriesSection/>
                <div className="games-wrapper">
                    {gamesData.map((doc) => {
                        return (
                            <GameCard game={doc.data()}/>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};

export default Home;