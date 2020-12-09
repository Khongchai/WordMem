export const undo = () =>
{
    //currentState will have to be added to future state
    //so that user can redo that action
    return{
        type: "UNDO_HISTORY"
    }
}


//TODO
export const redo = () =>
{
    return{
        type: "REDO_HISTORY"
    }
}