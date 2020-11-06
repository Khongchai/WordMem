import React from 'react';
import {addVocab}   from '../../fetch/fetch';
import './cards.css';

export default function(props)
{
    function addCard(e)
    {
        e.preventDefault();
        if (sendFetchToServer())
        {
            concatenateCurrentList();
        }
        
    }
    function concatenateCurrentList()
    {
        let currList = [...props.secondaryVocabList];
        //TODO for now, dummy values. Later, fill the empty object with info from a form
        let newList = { "id": 6, 
                        "meaning": "test test",
                        "memorizedOn": "2020-11-06",
                        "owner": 2,
                        synonyms:[],
                        "word": "Happy"};
        newList = [...currList, newList];

        setVocabAndAddAnimation(newList);
    }
    function sendFetchToServer()
    {
        //TODO, make actual fetch. Return true for now.
        return true;
    }

    async function setVocabAndAddAnimation(newList)
    {
        await props.setBothVocabList(newList);
        let lastCard = document.querySelectorAll(".card:last-child");
        lastCard[0].classList.add("slide-in-from-left");
    }
    return(
        <form className="nav-item add-card-buttons" onSubmit={(e)=>addCard(e)}>
            <button className="dashboard-button">
                Add Card
            </button>
        </form>
    );
}