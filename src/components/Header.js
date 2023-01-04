import React, {useCallback, useContext, useState} from 'react';
import '../styles/Header.scss'
import {AuthContext} from "../firebase/Auth";
import {Link, useNavigate} from "react-router-dom";
import app from "../firebase/config";
import {Button} from "@mui/material";

const Header = ({userData}) => {
    const currentUser = useContext(AuthContext);
    const {name} = userData || {};
    let navigate = useNavigate();

    const [isHovering, setIsHovering] = useState(false);

    const handleMouseOver = () => {
        setIsHovering(true);
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
            alert(e)
        }
    }, [navigate])
    return (
        <div className='header-wrapper'>
            <h3 className='header-title'>CSN-GAMES</h3>
            <div className="wrapper-buttons">
                {currentUser ?
                    (<div className='header-username-wrapper'>
                        <span className='header-username' onMouseOver={handleMouseOver}
                              onMouseOut={handleMouseOut}>{name}</span>
                        {isHovering && (
                            <div className='username-hide-block' onMouseOver={handleMouseOver}
                                 onMouseOut={handleMouseOut}>
                                <Link to="/favorites">Favorites</Link>

                                <Button onClick={logout} className='logout-btn' size="small" variant="contained">Sign out</Button>
                            </div>
                        )}
                    </div>) : (
                        <>
                            <Link to="/login">Login</Link>
                        </>
                    )
                }
            </div>
        </div>
    );
};

export default Header;