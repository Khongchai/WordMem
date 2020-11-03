import React from 'react';
import {addVocab}   from '../../fetch/fetch';
import './cards.css';

export default function()
{
    function addCard(e)
    {
        e.preventDefault();
    }
    return(
        <form className="nav-item add-card-buttons" onSubmit={(e)=>addCard(e)}>
            <button className="dashboard-button">
                Add Card
            </button>
        </form>
    )
}