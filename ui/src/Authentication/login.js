import {setLocalStorageAuthState} from "./AuthState";
import GuyReadingBookSVG from '../svg/guyreadingbook';
import {login} from "../fetch/fetch";
import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import { useHistory } from 'react-router-dom';

function Login(props)
{
    return (
      <div id="loginContainer">
        <div id="loginComponentsContainer">
          <div style={{textAlign:"center", fontSize: "2em", fontWeight: "bold"}}>Log In</div>
          <LogInForm />
        </div>
        <GuyReadingBookSVG />
      </div>
    )
}

function LogInForm(props)
{
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  let history = useHistory();
  function logUserIn(e)
  { 
    e.preventDefault();
    login(username, password).then(dataOfUser => {
      return setLocalStorageAuthState(dataOfUser, "LOG_IN");
    }).then(ok => {
        if (ok)
        {
          history.push("/dashboard");
        }
        else
        {
            //notify incorrect credentials
        }
    });
  }
  return(
    <form style={{padding: "10px"}} onSubmit={(e) => {logUserIn(e)}}>

      <label for="username"><b>Username</b></label>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} name="username" required />

      <label for="password"><b>Password</b></label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} name="password" required />
      
      <div style={{width:"100%", textAlign: "center"}}><button type="submit">Login</button></div>
      <small>Don't have an account? <Link to="/">Register here</Link></small>
    </form>
  )
}



export default Login;

//implement login functionality
//also redirect tto Dashboard after logging in