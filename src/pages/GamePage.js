import React, {useContext, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useParams} from "react-router";
import {
    doc,
    getDoc,
    updateDoc,
    setDoc,
    collection,
    arrayUnion,
    arrayRemove,
    query,
    where,
    getDocs, orderBy
} from "firebase/firestore";
import {db} from "../firebase/config";
import firebase from "firebase/compat/app";
import {AuthContext} from "../firebase/Auth";
import {Button, IconButton} from "@mui/material";
import {FavoriteBorder} from "@mui/icons-material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import {Rating} from 'react-simple-star-rating'
import categories from "../mocks/categories";
import Header from "../components/Header";

import '../styles/GamePage.scss'
import GameCard from "../components/GameCard";
import moveToTop from "../utils/moveToTop";
import GamesList from "../modules/GamesList";

const EASY = 2
const OUTDOOR_GAMES = 'outdoor'

const GamePage = () => {
    let {gameId} = useParams();
    const currentUser = useContext(AuthContext);
    const navigate = useNavigate()
    const [pending, setPending] = useState(true);
    const [gameData, setGameData] = useState(null);
    const [gameCategory, setGameCategory] = useState(null);
    const [sameGames, setSameGames] = useState(null);
    const [personalGames, setPersonalGames] = useState(null);
    const [rating, setRating] = useState(0)
    const [isFavorite, setFavorite] = useState(false)

    useEffect(() => {
        fetchGameData()
        fetchPersonalGamesData()
        moveToTop()
    }, [gameId])

    const handleRating = (rate) => {
        if (!currentUser) {
            navigate('/login', {replace: true})
            return
        }
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
            fetchSameGames(docSnapGame.data().category_id)
            let categoryId = await categories.find(category => category.id === docSnapGame.data().category_id)
            await setGameCategory(categoryId.name)
            const sumRate = docSnapGame.data().rating?.reduce(
                (accumulator, currentValue) => accumulator + currentValue.rate,
                0,
            ) / docSnapGame.data().rating?.length;

            await setRating(sumRate ? sumRate : 0)
            currentUser && await fetchFavorites()
            setPending(false)

        } else {
            console.log("Document does not exist")
        }
    }

    async function fetchSameGames(categoryId) {
        const collectionGames = query(collection(db, "games"), where("category_id", "==", categoryId));
        const querySnapshot = await getDocs(collectionGames);
        const filteredSameGames = querySnapshot.docs.filter((game)=>game.id !== gameId)
        setSameGames(filteredSameGames)

    }

    async function fetchPersonalGamesData() {
        const gameType = localStorage.getItem('gameType') || OUTDOOR_GAMES
        const gameDifficulty = localStorage.getItem('gameDifficulty') || EASY

        const collectionGames = query(collection(db, "games"), orderBy('difficulty'), orderBy('createdAt'),
            where("type", "==", gameType),
            where("difficulty", "<=", Number(gameDifficulty)));
        const querySnapshot = await getDocs(collectionGames);
        setPersonalGames(querySnapshot.docs)
    }

    async function updateGameData(rate) {
        const docGame = doc(db, "games", gameId);
        const gameRateArr = gameData.rating
        const currentUserId = firebase.auth().currentUser?.uid
        const filteredGameRateArr = gameRateArr.filter(obj => obj.currentUserId !== currentUserId)

        await updateDoc(docGame, {
            rating: [...filteredGameRateArr, {currentUserId, rate}]
        })
    }

    async function addToFavorites() {
        if (!currentUser) {
            navigate('/login', {replace: true})
            return
        }
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
                            sx={{background: '#d27979', width: '100%'}}
                            color="error"
                            size="small"
                            onClick={addToFavorites}
                        >{
                            isFavorite ?
                                <>
                                    Added to favorites
                                    <FavoriteIcon sx={{color: 'red', marginLeft: '15px'}}/>
                                </> :
                                <>
                                    Add to favorites
                                    < FavoriteBorder sx={{color: 'red', marginLeft: '15px'}}/>
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
            <div className="same-games-wrapper">
                <h3 className="same-games-title">Same games</h3>
               <GamesList gamesList={sameGames}/>
            </div>
            <div className="same-games-wrapper">
                <h3 className="same-games-title">Games you might like</h3>
               <GamesList gamesList={personalGames}/>
            </div>

        </>
    );
};

export default GamePage;