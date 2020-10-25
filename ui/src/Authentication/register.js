import '../App.css';
import { register } from '../fetch/fetch';
import GuyReadingBookSVG from '../svg/guyreadingbook';
import React, {useState} from 'react';
import {Link} from 'react-router-dom';



function Register(props)
{
    return (
      <div id="loginContainer">
        <div id="loginComponentsContainer">
          <div style={{textAlign:"center", fontSize: "2em", fontWeight: "bold"}}>WELCOME!</div>
          <RegisterForm />
        </div>
        <GuyReadingBookSVG />
      </div>
    )
}

function RegisterForm(props)
{
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  function registerUser(e)
  { 
    e.preventDefault();
    //TODO => log the user in with the data and then redirect to homepage.
    register(username, password, email).then(dataForNewUser => {
      console.log(dataForNewUser);
    });
  }
  return(
    <div>
      <form style={{padding: "10px"}} onSubmit={(e) => {registerUser(e)}}>
        <label for="email"><b>Email</b></label>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} name="email" required />

        <label for="username"><b>Username</b></label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} name="username" required />

        <label for="password"><b>Password</b></label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} name="password" required />
        
        <div style={{width:"100%", textAlign: "center"}}><button type="submit">REGISTER</button></div>
      </form>
      <small>Already have an account? <Link to="/login">Log in here</Link></small>
    </div>
    
  )
}



export default Register;
