export const undo = () =>
{
    return{
        type: "UNDO_HISTORY"
    }
}

export const redo = () =>
{
    return{
        type: "REDO_HISTORY"
    }
}