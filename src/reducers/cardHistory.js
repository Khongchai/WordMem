import { showToast } from "../dashboard/toast";
const initialState = {
  past: [],
  present: [],
  future: [],
};

export default function (state = initialState, action) {
  const { past, present, future } = state;
  switch (action.type) {
    case "ADD_TO_HISTORY_PAST":
      past.push(action.payload);
      return {
        past,
        present,
        future,
      };
    case "ADD_TO_HISTORY_PRESENT":
      return {
        past,
        present: action.payload,
        future,
      };
    case "UNDO_HISTORY":
      // Remove last element from past and add current state to future
      return manageQueue(past, present, future, "UNDO");
    case "REDO_HISTORY":
      // Remove last element from future and add current state to future
      return manageQueue(future, present, past, "REDO");
    case "CLEAR_FUTURE":
      // Sever the pointer to future and discard when user perform new actions.
      return { past, present, future: [] };
    case "CLEAR_FUTURE_AND_PAST":
      return { past: [], present, future: [] };

    default:
      return state;
  }
}
function manageQueue(elemToPop, present, elemToPush, flag) {
  let poppedElemForPresent = elemToPop.pop();

  //Undo/redo only if there is anything to be undone
  if (poppedElemForPresent) {
    elemToPush.push(present);
    present = poppedElemForPresent;
    flag === "UNDO" ? showToast("undo") : showToast("redo");
  }

  if (flag === "UNDO") {
    return {
      past: elemToPop,
      present,
      future: elemToPush,
    };
  } else {
    return {
      past: elemToPush,
      present,
      future: elemToPop,
    };
  }
}
