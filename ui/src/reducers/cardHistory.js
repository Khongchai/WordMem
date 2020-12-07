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
        case 'UNDO':
            /*
            Return the last member of past array and add the 
            current state before undo to future, passed in action.payload.
            */
            let pastStateToBeReturned = past[past.length - 1];
            past.pop();
            future.push(action.payload);
            return pastStateToBeReturned;
        default:
            return state;
    };
};



