export default function (state = "", action) {
  switch (action.type) {
    case "SET_WORD":
      return action.payload;
    case "CLEAR_WORD":
      return "";
    default:
      return state;
  }
}
