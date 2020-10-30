import React, {useState} from 'react';
import './dashboard.css';
import Book from '../svg/book';
import {logout} from '../fetch/fetch';
import {getToken, setLocalStorageAuthState, getCurrentUser} from '../Authentication/AuthState';
import {useHistory} from 'react-router-dom';


export default function Dashboard()
{
    //store user's vocab within the state of this function

    var history = useHistory();
    function logUserOut(e)
    {
        e.preventDefault();
        logout(getToken())
        .then(logoutSuccessful => 
        {
            checkLogOutStatAndClearLocalStorage(logoutSuccessful);
        })
        
    }
    function checkLogOutStatAndClearLocalStorage(ok)
    {
        if (ok)
        {
            console.log("logout successful");
            setLocalStorageAuthState(null, "SIGN_OUT");
            history.push("/login");
        }
        else
        {
            throw new Error("logout unsuccessful");
        }
    }
    return (
        <div className="dashboardNavBar">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <div id="profile-pic">

                    </div>
                </li>

                <li className="nav-item">
                    <div className="user-name">
                        <p className="name-capitalized">
                            {JSON.parse(getCurrentUser()).username}
                        </p>
                    </div>
                </li>
                <br/>
                <br/>
                <li className="nav-item">
                    <div className="vocab-count">
                        <Book/>: 20
                    </div>
                </li>

                <form className="nav-item" onSubmit={(e)=>logUserOut(e)}>
                    <button className="dashboard-button">
                        Sign Out
                    </button>
                </form>
            </ul>
        </div>
    )
}

