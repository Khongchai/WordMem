export const setCurrentWord = (word) => {
  return {
    type: "SET_WORD",
    payload: word,
  };
};

export const clearCurrentWord = () => {
  return {
    type: "CLEAR_WORD",
  };
};
