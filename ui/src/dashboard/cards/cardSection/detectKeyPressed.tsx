import {allowDelete} from "../../../actions/allowDelete";
import {undo, redo} from "../../../actions/undoRedoHistory";
import {store} from "../../../index";
import detectChangedObjects from "./detectChangedObjects";


export default function detectKeyPressed(setMutableVocabList: any)
{
    console.log(setMutableVocabList)
    //Manages all keydown
    let undoKey = {
        "z": false
    }
    let redoKey = {
        "y": false
    }
    let ctrlPressed = false;
    manageDownKeys(undoKey, redoKey, ctrlPressed, setMutableVocabList);
    manageUpKeys(undoKey, redoKey, ctrlPressed);
}

function manageDownKeys(undoKey: { z: boolean; }, redoKey: {y: boolean; }, ctrlPressed: boolean, setMutableVocabList: any)
{
    document.addEventListener("keydown", function(e) {
        switch(e.key)
        {
            case("Control"):
                ctrlPressed = true;
                addORremoveDeleteIndicator("ADD");
                store.dispatch(allowDelete(true));
                break;
            case("z"):
                undoKey.z = true;
                break;
            case("y"):
                redoKey.y = true;
                break;
            default:
                //other keys pressed, do nothing
                break;
        } 
        handleUndoRedo(ctrlPressed, undoKey.z, redoKey.y, setMutableVocabList);  
        

    });
}

async function handleUndoRedo(ctrlPressed: boolean, zKey: boolean, yKey: boolean, setMutableVocabList: any)
{
    if (ctrlPressed)
    {
        //Maybe get rid of duplicate between these two and combine some similar functionalities.
        if (zKey)
        {
            zKey = false;
            let stateBeforeUndo = store.getState().cardHistory.present;
            store.dispatch(undo());
            let stateAfterUndo = store.getState().cardHistory.present;

            let fromBackend: any = await detectChangedObjects(stateBeforeUndo, stateAfterUndo);

            if (fromBackend)
            {
                setMutableVocabList(fromBackend);
            }

        }
        if (yKey)
        {
            yKey = false;
            let stateBeforeRedo = store.getState().cardHistory.present;
            store.dispatch(redo());
            let stateAfterRedo = store.getState().cardHistory.present;
            
            let fromBackend: any = await detectChangedObjects(stateBeforeRedo, stateAfterRedo);

            if (fromBackend)
            {
                console.log(fromBackend)
                setMutableVocabList(fromBackend);
            }

        }
    }
}

function manageUpKeys(undoKey: { z: any; }, redoKey: { y: any; }, ctrlPressed: boolean)
{
    document.addEventListener("keyup", function(e)
    {
        switch(e.key)
        {
            case("Control"):
                ctrlPressed = false;
                addORremoveDeleteIndicator("REMOVE");
                store.dispatch(allowDelete(false));
            case("z"):
                undoKey.z = false;
                break;
            case("y"):
                redoKey.y = false;
                break;
            default:
                //other keys pressed, do nothing
                break;
        } 

    });
}


function addORremoveDeleteIndicator(action: string)
{
    let cards = document.getElementsByClassName("card");
    let listLength = cards.length;
    if (action === "ADD")
    {
        for (let i = 0; i< listLength; i++)
        {
            cards[i].classList.add("delete-indicator");
        }
    }
    else
    {
        for (let i = 0; i< listLength; i++)
        {
            cards[i].classList.remove("delete-indicator");
        }
    }

}
