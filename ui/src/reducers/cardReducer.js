export default function(state = [], action)
{
    switch(action.type)
    {
        case 'ADD_CARD':
            return action.payload
        case 'REMOVE_CARD':
            console.log("%cTo be implemented", "color: red; font-weight: bold");
        default:
            return state;
    };
};

