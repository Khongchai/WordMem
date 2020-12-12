import React from 'react';
import {useDispatch} from 'react-redux';
import {setCurrentWord} from '../../actions/setCurrentWord';


export default function CardsContainer(props)
{
    const dispatch = useDispatch();


    async function handleClick(wordData)
    {
        dispatch(setCurrentWord(wordData.word));
        props.setMeaningAndSetSynonymList(wordData.meaning, wordData.synonyms);
        props.deleteCard(wordData.id);
    }
    return(
        <div id="cards-container">
        {
            props.mutableVocabList.map(wordData => (
                    <article key={wordData.id} className="card" onClick={() => handleClick(wordData)}>
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
            ))
        }
    </div>
    );
}