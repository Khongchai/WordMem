import React from 'react';
import {cambridgeDefinitionAPI} from '../../fetch/fetch';
import cambridgeLogo from '../../images/cambridge.png';
import oxfordLogo from '../../images/oxford.png';
import {useSelector} from 'react-redux';

export default function DefinitionsFromAPI(props)
{
    const selectedWord = useSelector(state => state.currentlySelectedWord);
    const className = selectedWord? "": "disabled-grayscale";
    async function fetchDefinition(dictionary)
    {
        switch(dictionary)
        {
            case("cambridge"):
                cambridgeDefinitionAPI(selectedWord)
                .then(arrayOfDefinitions => {
                    props.setMeaning(getDefinitionsAsHTML(arrayOfDefinitions))
                })
                break;
            case("oxford"):
                console.log(`calls oxford API for ${selectedWord}`);
                break;
            default:
                console.log("no dictionaries specified");
        }
    }
    function getDefinitionsAsHTML(arrayOfDefinitions)
    {
        const url = `https://dictionary.cambridge.org/dictionary/english/${selectedWord}`;
        return(
            <div>
                <ol>
                    {arrayOfDefinitions.map(definition => 
                        <li id="definition">
                            {definition}
                        </li>)}
                </ol>
                <a href={url} target="_blank">Go to Dictionary</a>
            </div>

            
        )
    }
    return(
        <div id="definitions-from-API">
            <img src={cambridgeLogo} className={className} onClick={() => fetchDefinition("cambridge")} style={{width:"100%"}}/>
            <img src={oxfordLogo} className={className} onClick={() => fetchDefinition("oxford")} style={{width:"100%"}}/>
        </div>
    )
}
