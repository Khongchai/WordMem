export const undo = (currentState) =>
{
    //currentState will have to be added to future state
    //so that user can redo that action
    return{
        type: "ADD_TO_HISTORY_PAST",
        payload: currentState
    }
}


//TODO
export const redo = () =>
{
    return{
        type: "UNDO_HISTORY"
    }
}