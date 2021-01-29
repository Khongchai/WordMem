import "./dashboard.css";
import Navbar from "./navbar/navbar";
import { getVocab, deleteVocab } from "../fetch/fetch";
import { getToken } from "../Authentication/AuthState";
import React, { useState, useEffect } from "react";
import Cards from "./cards/cardSection/cardsSection";
import Description from "./description/description";
import GuyOnComputer from "../svg/guyoncomputer";
import { useSelector, useDispatch } from "react-redux";
import AddCardForm from "./cards/addCardForm";
import { showToast } from "./toast";
import {
  addToHistoryPast,
  addToHistoryPresent,
  clearFutureAndPast,
} from "../actions/addToHistory";
import { clearCurrentWord } from "../actions/setCurrentWord";

var firstLoad = true;
export default function Dashboard(props) {
  //mutableVocabList can change, for example, when user filter for a word
  //whereas primary reflects the actual list the user has.
  const canDelete = useSelector((state) => state.allowDelete);
  const [mutableVocabList, setMutableVocabList] = useState("");

  const curList = useSelector((state) => state.cardHistory.present);
  const dispatch = useDispatch();
  const [meaning, setMeaning] = useState("");
  const [synonymList, setSynonymList] = useState([]);

  async function setBothVocabLists(list) {
    if (!firstLoad) {
      dispatch(addToHistoryPast(curList));
    }

    let listForUI = dispatch(addToHistoryPresent(list)).payload;
    setMutableVocabList(listForUI);

    return;
  }

  useEffect(() => {
    getVocab(getToken())
      .then((list) => {
        if (!tokenIsStillValid(list)) {
          clearLoggedData();
          window.location.reload();
        }
        setBothVocabLists(list);
        firstLoad = false;
      })
      .then(() => {
        clearStat();
      });
  }, []);

  function clearStat() {
    console.log("clearstat run");
    dispatch(clearFutureAndPast());
    dispatch(clearCurrentWord());
  }

  function tokenIsStillValid(response) {
    let valid = true;
    let invalid = false;
    if (response.detail) {
      var regex = new RegExp("invalid token[.]", "gi");
      return response.detail.match(regex) ? invalid : valid;
    } else {
      return valid;
    }
  }
  function clearLoggedData() {
    localStorage.clear();
  }

  function filterVocab(filteredArray) {
    setMutableVocabList(filteredArray);
  }
  async function deleteCard(word) {
    if (canDelete) {
      deleteVocab(getToken(), word).then((newList) => {
        setBothVocabLists(newList);
        showToast("Vocab deleted", "red");
      });
    }
  }

  return (
    <div>
      <AddCardForm setBothVocabLists={setBothVocabLists} />
      <GuyOnComputer />
      <dashboard>
        <Navbar />
        <placeholder className="navbar-placeholder"></placeholder>
        <div id="dashboard-main-window">
          <Cards
            vocabList={mutableVocabList}
            setMeaning={setMeaning}
            filterVocab={filterVocab}
            setSynonymList={setSynonymList}
            setBothVocabLists={setBothVocabLists}
            setMutableVocabList={setMutableVocabList}
            deleteCard={deleteCard}
          />
          <Description
            setBothVocabLists={setBothVocabLists}
            meaning={meaning}
            setMeaning={setMeaning}
            synonymsList={synonymList}
          />
        </div>
      </dashboard>
    </div>
  );
}
