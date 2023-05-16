import React, {useCallback, useContext, useState} from 'react';
import '../styles/Header.scss'
import {AuthContext} from "../firebase/Auth";
import {Link, useNavigate} from "react-router-dom";
import app from "../firebase/config";
import {Button, Fade} from "@mui/material";
import customEvent from "../utils/custom-event";

const Header = ({userData, fetchGamesData, setCategorySelect, showFavorites}) => {
    const currentUser = useContext(AuthContext);
    const {name} = userData || {};
    let navigate = useNavigate();
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseOver = () => {
        setIsHovering(true);
    };

    const headerLogoClick = () => {
        navigate('/', {replace: true})
        customEvent.trigger('setSortToDefault')
        setCategorySelect(0)
        fetchGamesData()
    };

    const handleMouseOut = () => {
        setIsHovering(false);
    };

    const logout = useCallback(async event => {
        event.preventDefault()
        try {
            await app.auth().signOut()
            navigate('/login', {replace: true})
        } catch (e) {
            console.log(e)
        }
    }, [navigate])

    return (<div className='header-wrapper'>
            <h1
                className='header-title'
                onClick={headerLogoClick}
            >
                CSN-GAMES
            </h1>
            <div className="wrapper-buttons">
                {currentUser ?
                    (<div className='header-username-wrapper'>
                        <span className='header-username' onMouseOver={handleMouseOver}
                              onMouseOut={handleMouseOut}>{name}</span>
                    {isHovering && (<Fade in={isHovering}>
                            <div className='username-hide-block' onMouseOver={handleMouseOver}
                                 onMouseOut={handleMouseOut}>
                                <Button onClick={showFavorites}>Favorites</Button>
                                <Button onClick={logout} className='logout-btn' size="small" variant="contained">Sign
                                    out</Button>
                            </div>
                        </Fade>

                    )}
                </div>) : (<>
                        <Link to="/login">Login</Link>
                    </>)}
            </div>
        </div>);
};

export default Header;