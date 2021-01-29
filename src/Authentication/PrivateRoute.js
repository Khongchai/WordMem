import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getAuthState } from './AuthState';

const PrivateRoute = ({component: Component, ...rest}) => 
{
    return(
        <Route {...rest} render={props=>(
            getAuthState()? <Component {...props} />: <Redirect to="/"/>
        )}/>
    )
}


export default PrivateRoute;