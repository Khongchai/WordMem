import React from 'react';
import {addVocab}   from '../../fetch/fetch';
import './cards.css';
import {useSelector} from 'react-redux';

export default function AddCardButton(props)
{

    function showForm()
    {
        document.getElementById("add-card-form").style.display = "flex";
        //show form
        //take info from form on submit
        // call addCard()
    }

    return(
        <button className="dashboard-button add-card-buttons" onClick={() => showForm()}>
            Add Card
        </button>
    );
}