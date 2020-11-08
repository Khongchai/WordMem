export const addCards = (list) =>
{
    return{
        type: 'ADD_CARD',
        payload: list
    }
}