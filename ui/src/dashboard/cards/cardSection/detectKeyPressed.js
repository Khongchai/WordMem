import {allowDelete} from "../../../actions/allowDelete";
import {undo, redo} from "../../../actions/undoRedoHistory";
import {store} from "../../../index";
import detectChangedObjects from "./detectChangedObjects";
export default function detectKeyPressed(setMutableVocabList)
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

function manageDownKeys(undoKey, redoKey, ctrlPressed, setMutableVocabList)
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

function handleUndoRedo(ctrlPressed, zKey, yKey, setMutableVocabList)
{
    if (ctrlPressed)
    {
        if (zKey)
        {
            let stateBeforeUndo = store.getState().cardHistory.present;
            store.dispatch(undo());
            let stateAfterUndo = store.getState().cardHistory.present;
            zKey = false;
            
            //detect what the differences between this and previous states are.
            //and send that difference to database
            //do not send the entire state, as it can be very slow
            //send to database

            let backendSaysOK = detectChangedObjects(stateBeforeUndo, stateAfterUndo);
            //TODO, authorize this only after backend says ok
            if (backendSaysOK)
            {
                setMutableVocabList(stateAfterUndo);
            }
        }
        if (yKey)
        {
            //perform redo
            yKey = false;
        }
    }
}

function manageUpKeys(undoKey, redoKey, ctrlPressed)
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


function addORremoveDeleteIndicator(action)
{
    let cards = document.getElementsByClassName("card");
    if (action === "ADD")
    {
        for (let card of cards)
        {
            card.classList.add("delete-indicator");
        }
    }
    else
    {
        for (let card of cards)
        {
            card.classList.remove("delete-indicator");
        } 
    }

}
