import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {addVocab} from '../../fetch/fetch';
import {getToken} from '../../Authentication/AuthState';
import {showToast} from '../toast';
import {clearFuture} from './../../actions/addToHistory';

export default function AddCardForm (props)
{
    const [word, setWord] = useState("");
    const [meaning, setMeaning] = useState("");
    const dispatch = useDispatch();
    const currList = useSelector(state => state.cardHistory.present);
    async function handleSubmit(e)
    {
        e.preventDefault();

        let _ = e.target.synonymsDropdown.selectedOptions;
        let selectedSynonyms = getValuesOfSelect(_);
        let newWord = word;
        let newMeaning = meaning;
        let newCard = createCardObject(newWord, newMeaning, selectedSynonyms);

        let finishedAddingCard = addCardToCardList(newCard);
        if (finishedAddingCard)
        {
            showToast("New word added successfully");
        }
        dispatch(clearFuture());

        
    }
    function getValuesOfSelect(list)
    {
        let newArr = [];
        for (let i = 0; i < list.length; i++)
        {
            newArr.push(list[i].value);
        }
        return newArr;
    }
    function createCardObject(word, meaning, synonyms)
    {
        let newCard = {
            word, meaning, synonyms
        };
        return newCard;

    }
    async function addCardToCardList(newCard)
    {
        let token = getToken();
        addVocab(token, newCard)
        .then(newCardList => {
            setVocabAndAddAnimation(newCardList);
        });
    }
    async function setVocabAndAddAnimation(newList)
    {
        props.setBothVocabLists(newList).
        then(() => {
            let lastCard = document.querySelectorAll(".card:last-child");
            lastCard[0].classList.add("slide-in-from-left");
            return;
        })
        .then(() => clearForm());
        
    }
    function clearForm()
    {
        setWord("");
        setMeaning("");
        return true;
    }

    
    return(
        <div id="add-card-form" onClick={(e) => {hideForm(e)}}>
            <form style={{width: "500px"}} onClick={(e) => e.stopPropagation()} onSubmit={(e) => handleSubmit(e)}>
                <input type="text" value={word} onChange={(e) => {setWord(e.target.value)}} 
                    name="word" required placeholder="Word; example: 'Happiness'" />

                <textarea type="text" value={meaning} onChange={(e) => {setMeaning(e.target.value)}} 
                    name="meaning" className="spacious-window" 
                    placeholder="Meaning; example: 'A type of good feeling'"required />
                
                <label for="synonyms-dropdown">Synonyms:</label>
                <select name="synonymsDropdown" className="spacious-window" multiple>
                    {currList.map(vocab => <option>{vocab.word}</option>)}
                </select>
                
                <button>Submit</button>
            </form>
        </div>
    );
}

function hideForm(e)
{
    e.target.style.display = "none";
}

