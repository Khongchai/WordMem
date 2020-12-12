export default function detectChangedObjects(stateBeforeChange, stateAfterchange, refKeys)
{
    if (stateBeforeChange.length > stateAfterchange.length)
    {
        //let oddCardID = getOddCardID(oddCard);
        //delete a card from list
        //send the oddcard ID
        console.log("fetch delete")
    }
    else 
    {
        console.log("fetch add");
        //add a card to list
        //just send the oddcard object
    }
    console.log(stateBeforeChange, stateAfterchange);
    //TODO detect changes in objects 
    //and decide whether to send POST, DELTE, OR PUT
    //this function returns boolean, if success, true, else false; return true for now
    return true;
}

function getOddCardID(oddCard)
{

}

