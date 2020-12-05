export default function(state = "", action)
{
    switch(action.type)
    {
        case 'SET_WORD':
            return action.payload
        default:
            return state;
    };
};

