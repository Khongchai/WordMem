import React from 'react';
import AddcardButton from './addcardButton';
import './cards.css';
import Shuffle from './shuffle';
import Searchbox from './search';


export default function(props)
{
    var vocabList = Array.from(props.vocabList);
    const secondaryVocabList = Array.from(props.secondaryVocabList);
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
        let length = secondaryVocabList.length;
        for (let i = 0; i < length; i++)
        {
            if (secondaryVocabList[i].id === id)
            {
                let synonym = secondaryVocabList[i].word;
                return synonym;
            }
        }
    }

    return(
        <div id="top-component">
            <Searchbox setVocabList={props.setVocabList} filterVocab={props.filterVocab} vocabListForReset={secondaryVocabList}/>
            <div id="cards-container">
                {vocabList.map(wordData => (
                    <article className="card" onClick={() => setMeaningAndSetSynonymList(wordData.meaning, wordData.synonyms)}>
                        <header>
                            <p>{wordData.memorizedOn}</p>
                            <h2>{wordData.word}</h2>
                        </header>    
                        <div className="synonyms">
                            <ui>
                                {
                                    wordData.synonyms.length > 0? 
                                    <small>Synonyms: {wordData.synonyms.length}</small>
                                    : <small >No synonyms added.</small>
                                }
                            </ui>
                            
                        </div>      
                    </article>
                ))}
            </div>
            <AddcardButton setBothVocabList={props.setBothVocabList} secondaryVocabList={props.secondaryVocabList}/>
            <Shuffle vocabList={vocabList} setBothVocabList={props.setBothVocabList}/>
        </div>
       
    )
}


