import React from 'react';
import  './cards.css';

export default function Shuffle(props)
{
    function shuffle(e, arrForShuffle)
    {
        e.preventDefault();
        let currentIndex = arrForShuffle.length, tempVal, randInt;

        while (0 !== currentIndex)
        {
            randInt = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            tempVal = arrForShuffle[currentIndex];
            arrForShuffle[currentIndex] = arrForShuffle[randInt];
            arrForShuffle[randInt] = tempVal;
        }
        let shuffledArr = arrForShuffle;
        props.setBothVocabLists(shuffledArr);

    }

    return(
        <form className="nav-item add-card-buttons" onSubmit={(e)=>shuffle(e, props.vocabList)}>
            <button className="dashboard-button">
                Shuffle
            </button>
        </form>
    )
}


