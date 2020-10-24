import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './Authentication/register';

class App extends React.Component
{
  //on start check if user is logged in using Tokenauthentication.
  render(){
    return (
      //Render this login page if user is not authenticated.
      <div>
        <Login/>
      </div>
    )
  }
}

export default App;
