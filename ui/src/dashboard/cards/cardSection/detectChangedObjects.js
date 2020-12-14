import {deleteVocab, addVocab} from '../../../fetch/fetch';
import {getToken} from '../../../Authentication/AuthState';

export default async function detectChangedObjects(stateBeforeChange, stateAfterChange)
{

    if (stateBeforeChange.length === stateAfterChange.length)
    {
        //check for edits here, return false for now
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
            if (flag === "DELETE")
            {
                let itemToBeRemoveID = longerArray[i].id;
                return await deleteVocab(getToken(), itemToBeRemoveID)
                .then(listofObj => listofObj);
               
            }
            else if (flag === "ADD")
            {
                let cardToBeAdded = longerArray[i];
                return await addVocab(getToken(), cardToBeAdded)
                .then(listofObj => listofObj);
            }   

        }  
        
    }
}
