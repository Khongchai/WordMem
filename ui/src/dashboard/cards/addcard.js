import React from 'react';
import './cards.css';

export default function()
{
    return(
        <form className="nav-item add-card-buttons" onSubmit={(e)=>console.log("submitted")}>
            <button className="dashboard-button">
                Add Card
            </button>
        </form>
    )
}