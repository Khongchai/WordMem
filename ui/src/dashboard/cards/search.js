import React, {useState, useEffect} from 'react';
export default function(props)
{
    const [searchbox, setSearchBox] = useState("");
    const wordList = props.vocabListForReset.map(vocab => vocab.word);


    function setSearchValueAndFilter(filterValue)
    {
        setSearchBox(filterValue);
        filter(filterValue);
    }
    function filter(filterValue)
    {
        var newArr = [];
        var regex = new RegExp(filterValue, "gi");
        for (let i = 0; i < wordList.length; i++)
        {
            if(regex.test(wordList[i]))
            {
                newArr.push(props.vocabListForReset[i]);
            }
        }
        props.filterVocab(newArr); 

    }
    return(
        <input className="search-box" placeholder="Search" 
        value={searchbox} onChange={(e) => (setSearchValueAndFilter(e.target.value))}/>
    )
}