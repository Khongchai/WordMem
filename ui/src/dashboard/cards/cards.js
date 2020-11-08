import React from 'react';
import AddcardButton from './addcardButton';
import './cards.css';
import Shuffle from './shuffle';
import Searchbox from './search';
import {useSelector} from 'react-redux';


export default function(props)
{
    var mutableVocabList = Array.from(props.vocabList);
    const immutableVocabList = useSelector(state => state.vocabList);
    function setMeaningAndSetSynonymList(meaning, synonymIDs)
    {
        props.setMeaning(meaning);
        props.setSynonymList(getSynonymListFromIDs(synonymIDs));
    }

    function getSynonymListFromIDs(IDs)
    {
        let synonymList = IDs.map(id => getSynonymFromID(id));
        return synonymList;
    }
    function getSynonymFromID(id)
    {
        let length = immutableVocabList.length;
        for (let i = 0; i < length; i++)
        {
            if (immutableVocabList[i].id === id)
            {
                let synonym = immutableVocabList[i].word;
                return synonym;
            }
        }
    }

    return(
        <div id="top-component">
            <Searchbox setVocabList={props.setVocabList} filterVocab={props.filterVocab}/>
            <div id="cards-container">
                {mutableVocabList.map(wordData => (
                    <article key={wordData.id} className="card" onClick={() => setMeaningAndSetSynonymList(wordData.meaning, wordData.synonyms)}>
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
            <AddcardButton setBothVocabLists={props.setBothVocabLists} immutableVocabList={props.immutableVocabList}/>
            <Shuffle vocabList={mutableVocabList} setBothVocabList={props.setBothVocabList}/>
        </div>
       
    )
}


