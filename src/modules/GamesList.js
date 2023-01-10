import React from 'react';
import GameCard from "../components/GameCard";

import '../styles/GamesList.scss';

const GamesList = ({gamesList}) => {
    return (
        <div className="games-wrapper">
            {gamesList?.length ? gamesList.map((doc, index) => {
                    return (
                        <GameCard game={doc} key={index}/>
                    )
                }) :
                <div>
                    There are no games in this category...
                </div>
            }
        </div>

    );
};

export default GamesList;