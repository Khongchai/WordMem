export const addToHistoryPast = (prevState) =>
{
    return{
        type: "ADD_TO_HISTORY_PAST",
        payload: prevState
    }
}

export const addToHistoryPresent = (curState) =>
{
    return{
        type: "ADD_TO_HISTORY_PRESENT",
        payload: curState
    }
}

