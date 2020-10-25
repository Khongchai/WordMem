import React from 'react';
import './App.css';
import Register from './Authentication/register';
import Login from './Authentication/login';
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import Dashboard from './dashboard/dashboard';
import {authState} from './Authentication/AuthState';

class App extends React.Component
{
  //on start check if user is logged in using Tokenauthentication.
  render()
  {
    //Render register page if user is not authenticated.
    return (
      <Router>
        <Switch>
          <Route exact path = "/">
            {() => isUserAlreadyAuthenticated(<Register/>)}
            </Route>
          <Route exact path = "/login">
            {() => isUserAlreadyAuthenticated(<Login/>)}
          </Route>
          <Route exact path = "/dashboard">
            {authState.isAuthenticated? <Dashboard/>:<Register/>}
          </Route>
        </Switch>
      </Router>

    )
  }
}

function isUserAlreadyAuthenticated(Component)
{
  return authState.isAuthenticated? <Redirect to="/dashboard"/>:Component
}


export default App;
