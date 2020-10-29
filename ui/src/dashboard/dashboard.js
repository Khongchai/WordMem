import React from 'react';
import {} from '../fetch/fetch';
import './dashboard.css';
import Navbar from './navbar';


export default function Dashboard(props)
{
    return (
        <dashboard>
            <Navbar/>
            <div className="navbar-placeholder"></div>
            <div className="dashboardMainWindow">

            </div>
        </dashboard>
        //Log out button here
    )
}