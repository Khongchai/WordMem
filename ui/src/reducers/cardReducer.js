export default function(state = [], action)
{
    switch(action.type)
    {
        case 'ADD_CARD':
            return action.payload
        //no idea what this is for; don't touch it!
        case 'REMOVE_CARD':
            console.log("%cTo be implemented", "color: red; font-weight: bold");
        default:
            return state;
    };
};

