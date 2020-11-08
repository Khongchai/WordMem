import React from 'react';
import {addVocab}   from '../../fetch/fetch';
import './cards.css';
import {useSelector} from 'react-redux';

export default function(props)
{
    let currList = useSelector(state => state.vocabList);
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
        //TODO for now, dummy values. Later, fill the empty object with info from a form
        let newList = { "id": 9, 
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
        props.setBothVocabLists(newList).
        then(() => {
            let lastCard = document.querySelectorAll(".card:last-child");
            lastCard[0].classList.add("slide-in-from-left");
        });
        
    }
    return(
        <form className="nav-item add-card-buttons" onSubmit={(e)=>addCard(e)}>
            <button className="dashboard-button">
                Add Card
            </button>
        </form>
    );
}