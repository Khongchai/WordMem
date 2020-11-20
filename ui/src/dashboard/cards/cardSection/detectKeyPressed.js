import {useSelector, useDispatch} from 'react-redux';
import React from 'react';
export default function detectKeyPressed(props)
{
    let allowDelete = useSelector(state => state.allowDelete);
    let dispatch = useDispatch(); 
    document.addEventListener("keydown", function(e) {
        if (e.key === "Control")
        {
            addORremoveDeleteIndicator("ADD");
            dispatch(allowDelete(true));
        }
    });
    document.addEventListener("keyup", function(e)
    {
        addORremoveDeleteIndicator("REMOVE");
        dispatch(allowDelete(false));
    });
    return(null);
}

function addORremoveDeleteIndicator(action)
{
    let cards = document.getElementsByClassName("card");
    if (action === "ADD")
    {
        for (let card of cards)
        {
            card.classList.add("delete-indicator");
        }
    }
    else
    {
        for (let card of cards)
        {
            card.classList.remove("delete-indicator");
        } 
    }

}
