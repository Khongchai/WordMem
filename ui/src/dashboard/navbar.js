import React from 'react';
import './dashboard.css';
import Book from '../svg/book';

export default function Dasboard()
{
    return (
        <div className="dashboardNavBar">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <div id="profile-pic">

                    </div>
                </li>

                <li className="nav-item">
                    <div className="user-name">
                        Pyotr
                        
                    </div>
                </li>
                <br/>
                <br/>
                <li className="nav-item">
                    <div className="vocab-count">
                        <Book/>: 20
                    </div>
                </li>

                <li className="nav-item">
                    <button className="dashboard-button">
                        Sign Out
                    </button>
                </li>
            </ul>
        </div>
    )
}

