import React, {useEffect, useState} from 'react';
import Header from "../components/Header";
import {useParams} from "react-router";
import {doc, getDoc,updateDoc} from "firebase/firestore";
import {db} from "../firebase/config";
import { Rating } from 'react-simple-star-rating'

import '../styles/GamePage.scss'
import categories from "../mocks/categories";
import firebase from "firebase/compat/app";
import login from "./Login";

const GamePage = () => {
    let {gameId} = useParams();
    const [pending, setPending] = useState(true);
    const [gameData, setGameData] = useState(null);
    const [gameCategory, setGameCategory] = useState(null);
    const [rating, setRating] = useState(0)

    const handleRating = (rate) => {
        console.log('hui',rate)
        setRating(rate)
        // other logic
        updateGameData(rate)
    }



    async function fetchGameData() {
        const docGame = doc(db, "games", gameId);
        const docSnapGame = await getDoc(docGame);

        if (docSnapGame.exists()) {
            await setGameData(docSnapGame.data())
            let categoryId = await categories.find(category => category.id === docSnapGame.data().category_id)
            await setGameCategory(categoryId.name)
            const sumRate = docSnapGame.data().rating.reduce(
                (accumulator, currentValue) => accumulator + currentValue.rate,
                0,
            )/docSnapGame.data().rating.length;

            await setRating(sumRate ? sumRate : 0)
            setPending(false)

        } else {
            console.log("Document does not exist")
        }

    }
    async function updateGameData(rate) {
        const docGame = doc(db, "games", gameId);
        const gameRateArr = gameData.rating
        const currentUserId = firebase.auth().currentUser.uid
        const filteredGameRateArr = gameRateArr.filter(obj => obj.currentUserId !== currentUserId)

        await updateDoc(docGame,{
            rating: [...filteredGameRateArr,{currentUserId,rate}]
        })
    }

    useEffect(() => {
        fetchGameData()
    }, [])

    if (pending)
        return (
            <div>Loading...</div>
        )

    return (
        <>
            <Header/>
            <div className="game-page-wrapper">
                <div className="game-info">
                    <h5 className="game-name">{gameData.name}</h5>
                    <h5 className="game-category">{gameCategory}</h5>
                    <p className="game-description">{gameData.description}</p>
                    <Rating
                        onClick={handleRating}
                        initialValue={rating}
                        /* Available Props */
                    />
                </div>
                <div className="game-window">
                    <img className="game-preview" src={gameData.image} alt={gameData.name}/>
                    Place for the game here.
                </div>
            </div>

        </>
    );
};

export default GamePage;