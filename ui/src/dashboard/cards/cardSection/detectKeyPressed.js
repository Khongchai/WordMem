import {allowDelete} from "../../../actions/allowDelete";
import {undo, redo} from "../../../actions/undoRedoHistory";
import {store} from "../../../index";
export default function detectKeyPressed()
{
    //Manages all keydown
    let undoKey = {
        "z": false
    }
    let redoKey = {
        "y": false
    }
    let ctrlPressed = false;
    manageDownKeys(undoKey, redoKey, ctrlPressed);
    manageUpKeys(undoKey, redoKey, ctrlPressed);
}

function manageDownKeys(undoKey, redoKey, ctrlPressed)
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
        handleUndoRedo(ctrlPressed, undoKey.z, redoKey.y);  
        

    });
}

function handleUndoRedo(ctrlPressed, zKey, yKey)
{
    if (ctrlPressed)
    {
        if (zKey)
        {
            //get currentState somehow and passed into undo
            //before calling undo, make sure you read the value of
            //the last member of past first
            let currentState = (store.getState()).vocabList;
            store.dispatch(undo(currentState));
            zKey = false;
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
