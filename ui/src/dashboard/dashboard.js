import {} from '../fetch/fetch';
import './dashboard.css';
import Navbar from './navbar/navbar';
import {getVocab, deleteVocab} from '../fetch/fetch';
import {getToken} from '../Authentication/AuthState';
import React, {useState, useEffect} from 'react';
import Cards from './cards/cardSection/cardsSection';
import Description from './description/description';
import GuyOnComputer from '../svg/guyoncomputer';
import {useSelector, useDispatch} from 'react-redux';
import AddCardForm from './cards/addCardForm';
import {showToast} from './toast';
import { addToHistoryPast, addToHistoryPresent } from '../actions/addToHistory';

var firstLoad = true;
export default function Dashboard(props)
{
    //mutableVocabList can change, for example, when user filter for a word
    //whereas primary reflects the actual list the user has.
    const canDelete = useSelector(state => state.allowDelete);
    const [mutableVocabList, setmutableVocabList] = useState('');
    
    const curList = useSelector(state => state.cardHistory.present);
    const dispatch = useDispatch();
    const [meaning, setMeaning] = useState('');
    const [synonymList, setSynonymList] = useState([]);

    async function setBothVocabLists(list)
    {
        if (!firstLoad)
        {
            dispatch(addToHistoryPast(curList));
        }

        dispatch(addToHistoryPresent(list));
        setmutableVocabList(list);
        return;
    }


    useEffect(() => {
        getVocab(getToken()).then(list => {

            if (!tokenIsStillValid(list))
            {
                clearLoggedData();
                window.location.reload();
            }
            setBothVocabLists(list);
            firstLoad = false;
        })
      }, []);

    function tokenIsStillValid(response)
    {
        let valid = true;
        let invalid = false;
        if (response.detail)
        {
            var regex = new RegExp("invalid token[.]", "gi");
            return response.detail.match(regex)? invalid: valid;
        }
        else
        {
            return valid;
        }
       
    }
    function clearLoggedData()
    {
        localStorage.clear();
    }


    function filterVocab(filteredArray)
    {
        setmutableVocabList(filteredArray);
    }
    async function deleteCard(id)
    {
        if (canDelete)
        {
            deleteVocab(getToken(), id)
            .then(newList=> {
                setBothVocabLists(newList);
                showToast("Vocab deleted", "red");
            })
            
        }
    }
    function undo()
    {
        //TODO
        //save current state then pass to showToast
        //if user click on undo button in toast, redo the deletion
        //don't forget to send to backend
    }

    return (
        <div>
            <AddCardForm setBothVocabLists={setBothVocabLists}/>
            <GuyOnComputer/>
            <dashboard>
                <Navbar/>
                <placeholder className="navbar-placeholder"></placeholder>
                <div className="dashboardMainWindow">
                    <Cards vocabList={mutableVocabList} setMeaning={setMeaning}  
                    filterVocab={filterVocab} setSynonymList={setSynonymList}
                    setBothVocabLists={setBothVocabLists} deleteCard={deleteCard}/>
                    <Description meaning={meaning} setMeaning={setMeaning} synonymsList={synonymList}/>
                </div>
            </dashboard>
        </div>
        


    )
}

