import React, {useState, useEffect} from 'react';
import './cards.css'


export default function(props)
{
    var vocabList = Array.from(props.vocabList);
    return(
        <div id="cards-container">
            {vocabList.map(wordData => (
                <article className="card" onClick={() => props.setMeaning(wordData.meaning)}>
                    <header>
                        <p>{wordData.memorizedOn}</p>
                        <h2>{wordData.word}</h2>
                    </header>    
                    <div className="synonyms">
                        {
                        wordData.synonyms? wordData.synonyms.map(syn => (
                            <small>{syn}</small>
                        )): <small>No synonyms added.</small>

                    }
                    </div>      
                </article>
            ))}
            <br/><br/>
        </div>

    )
}