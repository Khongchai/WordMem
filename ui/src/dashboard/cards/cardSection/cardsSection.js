import React, {useEffect} from 'react';
import AddcardButton from '../addcardButton';
import '../cards.css';
import Shuffle from '../shuffle';
import Searchbox from '../search';
import {useSelector} from 'react-redux';
import CardsContainer from '../cardsContainer';
import detectKeyPressed from './detectKeyPressed';


detectKeyPressed();

export default function CardSection(props)
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
            <CardsContainer mutableVocabList={mutableVocabList} setMeaningAndSetSynonymList={setMeaningAndSetSynonymList}/>
            <AddcardButton setBothVocabLists={props.setBothVocabLists} immutableVocabList={props.immutableVocabList}/>
            <Shuffle vocabList={mutableVocabList} setBothVocabLists={props.setBothVocabLists}/>
        </div>
       
    )
}



