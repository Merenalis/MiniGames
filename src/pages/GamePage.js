import React, {useContext, useEffect, useState} from 'react';
import Header from "../components/Header";
import {useParams} from "react-router";
import {doc, getDoc, updateDoc, setDoc, collection, arrayUnion,arrayRemove } from "firebase/firestore";
import {db} from "../firebase/config";
import {Rating} from 'react-simple-star-rating'

import '../styles/GamePage.scss'
import categories from "../mocks/categories";
import firebase from "firebase/compat/app";
import {AuthContext} from "../firebase/Auth";
import {Button, IconButton} from "@mui/material";
import {FavoriteBorder} from "@mui/icons-material";
import FavoriteIcon from '@mui/icons-material/Favorite';

const GamePage = () => {
    let {gameId} = useParams();
    const currentUser = useContext(AuthContext);

    const [pending, setPending] = useState(true);
    const [gameData, setGameData] = useState(null);
    const [gameCategory, setGameCategory] = useState(null);
    const [rating, setRating] = useState(0)
    const [isFavorite, setFavorite] = useState(false)

    useEffect(() => {
        fetchGameData()
    }, [])

    const handleRating = (rate) => {
        setRating(rate)
        updateGameData(rate)
    }

    async function fetchFavorites() {
        const docUser = doc(db, "users", currentUser.uid);
        const docSnapUsers = await getDoc(docUser);

        if (docSnapUsers.exists()) {
            const res = await docSnapUsers.data().favorites?.includes(gameId)
            await setFavorite(res)
        } else {
            console.log("Document does not exist")
        }
    }

    async function fetchGameData() {
        const docGame = doc(db, "games", gameId);
        const docSnapGame = await getDoc(docGame);

        if (docSnapGame.exists()) {
            await setGameData(docSnapGame.data())
            let categoryId = await categories.find(category => category.id === docSnapGame.data().category_id)
            await setGameCategory(categoryId.name)
            const sumRate = docSnapGame.data().rating?.reduce(
                (accumulator, currentValue) => accumulator + currentValue.rate,
                0,
            ) / docSnapGame.data().rating?.length;

            await setRating(sumRate ? sumRate : 0)
            await fetchFavorites()
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

        await updateDoc(docGame, {
            rating: [...filteredGameRateArr, {currentUserId, rate}]
        })
    }

    async function addToFavorites() {
        const usersRef = collection(db, "users");
        await setDoc(doc(usersRef, currentUser.uid), {
            favorites: isFavorite ? arrayRemove(gameId) : arrayUnion(gameId)
        }, {merge: true});
        await fetchFavorites()
    }

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
                    <div className="game-rating">
                        <Rating
                            onClick={handleRating}
                            initialValue={rating}
                            /* Available Props */
                        />
                    </div>
                    <div className="game-favorites">
                        <Button
                            variant="contained"
                            sx={{background:'#d27979',width: '100%'}}
                            color="error"
                            size="small"
                            onClick={addToFavorites}
                        >{
                            isFavorite ?
                                <>
                                    Added to favorites
                                    <FavoriteIcon sx={{color: 'red',marginLeft:'15px'}}/>
                                </> :
                                <>
                                    Add to favorites
                                    < FavoriteBorder sx={{color: 'red',marginLeft:'15px'}}/>
                                </>
                        }
                        </Button>
                    </div>
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