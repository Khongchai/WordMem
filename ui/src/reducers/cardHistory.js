const initialState = {
    past: [],
    present: [],
    future: [],
}


export default function(state = initialState, action)
{
    const {past, present, future} = state;
    switch(action.type)
    {
        
        case 'ADD_TO_HISTORY_PAST':
            past.push(action.payload);
            return{
                past,
                present,
                future
            };
        case 'ADD_TO_HISTORY_PRESENT':
            return{
                past,
                present: action.payload,
                future
            };
        case 'UNDO_HISTORY':
        /*
        Remove last element from past and add current state to future
        */
        return manageUndo(past, present, future);

            
        default:
            return state;
    };
};

function manageUndo(past, present, future)
{
    let curPast = past.pop();

    //Undo only if there is anything to be undone
    if (curPast)
    {  
        if(curPast)
        {
            future.push(present);
            present = curPast;
        }
    }
    return {
        past, present, future
        };
}


