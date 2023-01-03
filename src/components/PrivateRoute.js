import React, {useContext, useState} from 'react';
import {AuthContext} from "../firebase/Auth";
import {Route, redirect} from "react-router-dom";

const PrivateRoute = ({component: RouteComponent, ...rest}) => {
    const {currentUser} = useContext(AuthContext)

    return (
        <Route {...rest}
        render={routeProps =>
        !!currentUser ? (
            <RouteComponent {...routeProps}/>
        ) :
            redirect("/login")

        }
        >
            
        </Route>
    );
};

export default PrivateRoute;