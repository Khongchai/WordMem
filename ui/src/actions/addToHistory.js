export const addToHistoryPast = (prevState) =>
{
    return{
        type: "ADD_TO_HISTORY_PAST",
        payload: prevState
    }
}