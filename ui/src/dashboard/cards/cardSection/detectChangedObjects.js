import {deleteVocab, addVocab} from '../../../fetch/fetch';
import {getToken} from '../../../Authentication/AuthState';

export default async function detectChangedObjects(stateBeforeChange, stateAfterChange, refKeys)
{

    if (stateBeforeChange.length === stateAfterChange.length)
    {
        //check for edits here
        return false;
    }
    if (stateBeforeChange.length > stateAfterChange.length)
    {
        //iterate over the longer array to find which one will have to be deleted.
        return sendFetchtoDatabase(stateBeforeChange, stateAfterChange, "DELETE");
    }
    else 
    {
        //iterate over the longer array to find which one will have to be added.
        return sendFetchtoDatabase(stateAfterChange, stateBeforeChange, "ADD");

    }
}

async function sendFetchtoDatabase(longerArray, shorterArray, flag)
{
    let longerArrayLength = longerArray.length;
    for (let i = 0; i < longerArrayLength; i++)
    {
        let IDofItemInLongerArr = longerArray[i].id;
        let IDofItemInShorterArr = typeof(shorterArray[i]) === "undefined"? -1000: shorterArray[i].id;

        if(IDofItemInLongerArr !== IDofItemInShorterArr)
        {
            //The undone object MUST also have the new ID from backend.
            /*
                for ADD, write another backend serializer that returns an entire list for POST requests instead of just 
                the newly added card.
            */
            if (flag === "DELETE")
            {
                let itemToBeRemoveID = longerArray[i].id;
                return await deleteVocab(getToken(), itemToBeRemoveID)
                .then(listofObj => listofObj);
               
            }
            else if (flag === "ADD")
            {
                //TODO
                let cardToBeAdded = longerArray[i];
                let addedCard = await addVocab(getToken(), cardToBeAdded)
                .then(obj => obj);
                return {"card": addedCard, "index": i};
            }   

        }  
        
    }
}

function handleAdd()
{

}

