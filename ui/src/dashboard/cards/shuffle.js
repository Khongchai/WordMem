import React from 'react';
import  './cards.css';

export default function(props)
{
    return(
        <form className="nav-item add-card-buttons" onSubmit={(e)=>console.log("submitted")}>
            <button className="dashboard-button">
                Shuffle
            </button>
        </form>
    )
}