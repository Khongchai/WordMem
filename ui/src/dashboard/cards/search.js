import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
export default function Search(props)
{
    const [searchbox, setSearchBox] = useState("");
    const immutableVocabList = useSelector(state => state.cardHistory.present);

    function setSearchValueAndFilter(filterValue)
    {
        setSearchBox(filterValue);
        filter(filterValue);
    }
    function filter(filterValue)
    {
        var filteredList = getFilteredList(filterValue);
        setCardListAccordingToFilter(filteredList);
    }
    function getFilteredList(filterValue)
    {
        var newArr = [];
        var regex = new RegExp(escapeRegExp(filterValue), "gi");
        for (let i = 0; i < immutableVocabList.length; i++)
        {
            if(regex.test(immutableVocabList[i].word))
            {
                newArr.push(immutableVocabList[i]);
            }
        }
        return newArr;
    }
    function setCardListAccordingToFilter(newCardList)
    {
        props.filterVocab(newCardList); 
    }
    return(
        <input className="search-box" placeholder="Search" 
        value={searchbox} onChange={(e) => (setSearchValueAndFilter(e.target.value))}/>
    )
}

function escapeRegExp(string) {
    return string.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
  }