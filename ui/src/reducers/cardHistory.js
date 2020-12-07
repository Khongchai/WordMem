const initialState = {
    past: [],
    future: [],
}


export default function(state = initialState, action)
{
    const {past, future} = state;
    switch(action.type)
    {
        
        case 'ADD_TO_HISTORY_PAST':
            past.push(action.payload);
            return{
                past,
                future
            };


        case 'UNDO_HISTORY':
            /*
            Remove last element from past and add current state to future
            */

            past.pop();
            if (past.length){future.push(action.payload);}

            return {
            past, future
            };

            
        default:
            return state;
    };
};



