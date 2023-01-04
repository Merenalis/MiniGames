import React, {useState} from 'react';
import {Alert, Collapse, Fade} from "@mui/material";

const CustomAlert = ({alert}) => {
    const {show,type,text} = alert

    return (
        <>
            <Fade in={show}>
                <Alert
                    severity={type}
                    sx={{mb: 2}}
                >
                    {text}
                </Alert>
            </Fade>
        </>
    );
};

export default CustomAlert;