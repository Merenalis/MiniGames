import React from 'react';
import {Card, CardActionArea, CardContent, CardMedia, Typography} from "@mui/material";

const GameCard = ({game}) => {
    const {image,name} = game
    return (
        <Card sx={{ maxWidth: 245,width: '100%',textAlign: 'center',marginBottom: 2}}>
            <CardActionArea>
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