export const allowDelete = (status) =>
{
    return {
        type: "SET_STATUS",
        payload: status
    }
}