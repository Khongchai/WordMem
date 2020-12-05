import React from 'react';
import {cambridgeDefinitionAPI} from '../../fetch/fetch';

export default function getDefinitionAPI(dictionary)
{
    function fetchDefinition()
    {
        switch(dictionary)
        {
            case("cambridge"):
                cambridgeDefinitionAPI()
                .then(arrayOfDefinitions => {
                    console.log(arrayOfDefinitions);
                })
            default:
                console.log("no dictionaries specified");
        }
    }
    return(
        <div>
            {fetchDefinition(dictionary)}
        </div>
    )
}
