import React from 'react';
import {Card, CardActionArea, CardContent, CardMedia, Typography} from "@mui/material";
import { Link as RouterLink } from 'react-router-dom'

const GameCard = ({game}) => {
    const {image,name} = game.data()

    return (
        <Card sx={{ textAlign: 'center',width: '15rem',height: '200px',}}>
            <CardActionArea component={RouterLink} to={`/game/${game.id}`}>
                <CardMedia
                    component="img"
                    height="140"
                    image={image}
                    alt={name}
                />
                <CardContent sx={{ padding: 1}}>
                    <Typography gutterBottom variant="h6" component="div" noWrap={true}>
                        {name}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default GameCard;