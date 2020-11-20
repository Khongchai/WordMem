import React from 'react';
export default function CardsContainer(props)
{
    return(
        <div id="cards-container">
        {props.mutableVocabList.map(wordData => (
            <article key={wordData.id} className="card" onClick={() => props.setMeaningAndSetSynonymList(wordData.meaning, wordData.synonyms)}>
                <header>
                    <p>{wordData.memorizedOn}</p>
                    <h2>{wordData.word}</h2>
                </header>    
                <div className="synonyms">
                    <ui>
                        {
                            wordData.synonyms.length > 0? 
                            <small>Synonyms: {wordData.synonyms.length}</small>
                            :<small >No synonyms added.</small>
                        }
                    </ui>
                    
                </div>      
            </article>
        ))}
    </div>
    );
}