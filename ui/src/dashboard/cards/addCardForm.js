import React, {useState} from 'react';
import {useSelector} from 'react-redux';

export default function (props)
{
    const [newCard, setNewCard] = useState({});
    const [word, setWord] = useState("");
    const [meaning, setMeaning] = useState("");
    const immutableVocabList = useSelector(state => state.vocabList);

    
    return(
        <div id="add-card-form" onClick={(e) => {hideForm(e)}}>
            <form style={{width: "500px"}} onClick={(e) => e.stopPropagation()}>
                <input type="text" value={word} onChange={(e) => {setWord(e.target.value)}} 
                    name="word" required placeholder="Word; example: 'Happiness'" />

                <textarea type="text" value={meaning} onChange={(e) => {setMeaning(e.target.value)}} 
                    name="meaning" className="spacious-window" 
                    placeholder="Meaning; example: 'A type of good feeling'"required />
                
                <label for="synonyms-dropdown">Synonyms:</label>
                <select name="synonyms-dropdown" className="spacious-window" multiple>
                    {immutableVocabList.map(vocab => <option>{vocab.word}</option>)}
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

