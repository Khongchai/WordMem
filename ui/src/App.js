import React from 'react';
import './App.css';
import Register from './Authentication/register';
import Login from './Authentication/login';
import {BrowserRouter as Router, Switch} from "react-router-dom";
import Dashboard from './dashboard/dashboard';
import PrivateRoute from './Authentication/PrivateRoute';
import PublicRoute from './Authentication/PublicRoute';

function App()
{

  //on start check if user is logged in using Tokenauthentication.
    //Render register page if user is not authenticated.
    return (
      <Router>
        <Switch>
          <PublicRoute component={Register} restricted={true} exact path="/" />
          <PublicRoute component={Login} restricted={true} exact path="/login" />
          <PrivateRoute component={Dashboard} exact path="/dashboard" />
        </Switch>
      </Router>

    )

}

export default App;
