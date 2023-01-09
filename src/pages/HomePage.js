import React, {useContext, useEffect, useState} from 'react';
import {db} from '../firebase/config'
import firebase from "firebase/compat/app";
import {AuthContext} from "../firebase/Auth";
import {getDoc, doc, collection, query, getDocs, setDoc, where, orderBy} from "firebase/firestore";
import Header from "../components/Header";
import CategoriesSection from "../components/CategoriesSection";
import GameCard from "../components/GameCard";

import SearchComponent from "../components/SearchComponent";

const HomePage = () => {
    const currentUser = useContext(AuthContext);
    const [userData, setUserData] = useState(null)
    const [gamesData, setGamesData] = useState(null)
    const [categorySelect, setCategorySelect] = useState(null);

    useEffect(() => {
        try {
            if (currentUser)
                fetchUsersData()
            fetchGamesData()

        } catch (error) {
            console.log(error)
        }
    }, [])

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
        const collectionGames = query(collection(db, "games"), orderBy('createdAt'));
        const querySnapshot = await getDocs(collectionGames);
        setGamesData(querySnapshot.docs)
    }

    async function showFavorites() {
        let filteredGameRateArr = []
        userData.favorites?.forEach((gameId) => {
            filteredGameRateArr.push(...gamesData.filter(obj => obj.id === gameId))
        })
        setGamesData(filteredGameRateArr)
    }

    async function sortGamesData(option) {
        if (option === 'rating') {
            const collectionGames = query(collection(db, "games"), orderBy(option), orderBy('createdAt', "desc"));
            const querySnapshot = await getDocs(collectionGames);
            setGamesData(querySnapshot.docs.reverse())
        } else {
            const collectionGames = query(collection(db, "games"), orderBy('createdAt'));
            const querySnapshot = await getDocs(collectionGames);
            setGamesData(querySnapshot.docs)
        }
    }

    async function searchGamesData(text) {
        const collectionGames = query(collection(db, "games"));
        const querySnapshot = await getDocs(collectionGames);
        let filteredGames = querySnapshot.docs.filter(function (game) {
            return game.data().name.toLowerCase().includes(text.toLowerCase())
        })
        setGamesData(filteredGames)
    }

    const updateData = async (value) => {
        setCategorySelect(value)
        const collectionGames = query(collection(db, "games"), where("category_id", "==", value));
        const querySnapshot = await getDocs(collectionGames);
        setGamesData(querySnapshot.docs)
    }

    async function addGameTemplate() {
        const citiesRef = collection(db, "games");
        await setDoc(doc(citiesRef), {
            name: "SCRAP METAL 3: INFERNAL TRAP",
            category_id: 6,
            description: "You can explore treacherous mountainsides or kick up tons of dust in dry lake beds in this gorgeous 3D driving game. A huge map is waiting for you and you can head in any direction " +
                "you feel like. The choice is yours but be careful, otherwise your car will get totally trashed.",
            image: 'https://images.crazygames.com/games/scrap-metal-3-infernal-trap/thumb-1555951535646.png?auto=format,compress&q=75&cs=strip',
            rating: [],
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
    }

    return (
        <div>
            <Header userData={userData} fetchGamesData={fetchGamesData} setCategorySelect={setCategorySelect}
                    showFavorites={showFavorites}/>
            <br/>
            <SearchComponent searchFunc={searchGamesData} sortGamesData={sortGamesData}/>
            <div className='home-content'>
                <CategoriesSection updateData={updateData} categorySelect={categorySelect}/>
                <div className="games-wrapper">
                    {gamesData?.length ? gamesData.map((doc, index) => {
                            return (
                                <GameCard game={doc} key={index}/>
                            )
                        }) :
                        <div>
                            There are no games in this category...
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default HomePage;