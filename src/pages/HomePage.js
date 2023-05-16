import React, {useContext, useEffect, useState} from 'react';
import {db} from '../firebase/config'
import firebase from "firebase/compat/app";
import {AuthContext} from "../firebase/Auth";
import {getDoc, doc, collection, query, getDocs, setDoc, where, orderBy} from "firebase/firestore";
import Header from "../components/Header";
import CategoriesSection from "../components/CategoriesSection";
import GameCard from "../components/GameCard";

import SearchComponent from "../components/SearchComponent";
import GamesList from "../modules/GamesList";

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
        if (categorySelect) {
            if (option === 'rating') {
                const strAscending = [...gamesData].sort((a, b) =>
                    a.data().rating.length > b.data().rating.length ? 1 : -1,
                );
                setGamesData(strAscending)
            } else {
                const strAscending = [...gamesData].sort((a, b) =>
                    a.data().createdAt > b.data().createdAt ? 1 : -1,
                );
                setGamesData(strAscending)
            }
        }
        else {
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
    // async function addGameTemplate() {
    //     const gamesRef = collection(db, "games");
    //     await setDoc(doc(gamesRef), {
    //         name: "MASTER CHESS",
    //         category_id: 5,
    //         description: "You can play against the computer or take on a friend in this challenging chess game. Just be sure to play as quickly as you can. Each passing second that it takes to get a checkmate will lower your score!",
    //         image: 'https://gameforge.com/de-DE/littlegames/includes/images/games/10524_5eb3f13a9b0f5.jpg',
    //         rating: [],
    //         createdAt: firebase.firestore.FieldValue.serverTimestamp()
    //     });
    // }

    return (
        <div>
            <Header userData={userData} fetchGamesData={fetchGamesData} setCategorySelect={setCategorySelect}
                    showFavorites={showFavorites}/>
            <br/>
            <SearchComponent searchFunc={searchGamesData} sortGamesData={sortGamesData}/>
            <div className='home-content'>
                <CategoriesSection updateData={updateData} categorySelect={categorySelect}/>
                <GamesList gamesList={gamesData}/>
            </div>
        </div>
    );
};

export default HomePage;