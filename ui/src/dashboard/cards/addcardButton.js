import React from 'react';
import './cards.css';

export default function AddCardButton(props)
{

    function showForm()
    {
        document.getElementById("add-card-form").style.display = "flex";

    }

    return(
        <button className="dashboard-button add-card-buttons" onClick={() => showForm()}>
            Add Card
        </button>
    );
}