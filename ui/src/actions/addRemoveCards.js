export const addCards = (list) =>
{
    return{
        type: 'ADD_CARD',
        payload: list
    }
}

export const removeCard = (id) =>
{
    return{
        type: "REMOVE_CARD",
        payload: id
    }
}