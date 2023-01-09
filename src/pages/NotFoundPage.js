import React from 'react';
import {Box, Button, Typography} from "@mui/material";
import { purple } from '@mui/material/colors';
import {useNavigate} from "react-router-dom";

const NotFoundPage = () => {
    let navigate = useNavigate();

    function backHome() {
        navigate('/', { replace: true })
    }

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                minHeight: '100vh',
                backgroundColor: purple[900],
            }}
        >
            <Typography variant="h1" style={{ color: 'white' }}>
                404
            </Typography>
            <Typography variant="h6" style={{ color: 'white' }}>
                The page you’re looking for doesn’t exist.
            </Typography>
            <Button variant="contained" onClick={backHome}>Back Home</Button>
        </Box>
    );
};

export default NotFoundPage;