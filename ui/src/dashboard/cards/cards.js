import React, {useState, useEffect} from 'react';
import './cards.css'

export default function(props)
{
    var vocabList = Array.from(props.vocabList);
    return(
        <div id="cards-container">
            {vocabList.map(wordData => (
                <article className="card">
                    <header>
                        <p>{wordData.memorizedOn}</p>
                        <h2>{wordData.word}</h2>
                    </header>          
                </article>
            ))}
        </div>
    )
}