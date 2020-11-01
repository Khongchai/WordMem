import React from 'react';

export default function()
{
    return(
        <form className="nav-item add-card" onSubmit={(e)=>console.log("submitted")}>
            <button className="dashboard-button">
                Add Card
            </button>
        </form>
    )
}