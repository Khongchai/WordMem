import React, {useState, useEffect} from 'react';
import '../dashboard.css';
import Book from '../../svg/book';
import {logout, getVocab} from '../../fetch/fetch';
import {getToken, setLocalStorageAuthState, getCurrentUser} from '../../Authentication/AuthState';
import {useHistory} from 'react-router-dom';



export default function Navbar(props)
{

    var history = useHistory();
    function logUserOut(e)
    {
        e.preventDefault();
        logout(getToken())
        .then(logoutSuccessful => 
        {
            if (checkLogOutStatAndClearLocalStorage(logoutSuccessful))
            {
                history.push("/login");
            }
        })
        
    }
    function checkLogOutStatAndClearLocalStorage(ok)
    {
        if (ok)
        {
            setLocalStorageAuthState(null, "SIGN_OUT");
            return true
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
                        <Book/>: {props.vocabList.length}
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

