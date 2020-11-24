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
import {addCards} from '../actions/addRemoveCards';
import AddCardForm from './cards/addCardForm';
import Toast from './toast';


export default function Dashboard(props)
{
    //mutableVocabList can change, for example, when user filter for a word
    //whereas primary reflects the actual list the user has.
    const immutableVocabList = useSelector(state => state.vocabList);
    const canDelete = useSelector(state => state.allowDelete);
    const [mutableVocabList, setmutableVocabList] = useState('');
    const dispatch = useDispatch();
    const [meaning, setMeaning] = useState('');
    const [synonymList, setSynonymList] = useState([]);

    async function setBothVocabLists(list)
    {
        dispatch(addCards(list));
        setmutableVocabList(list);
        return;
    }

    useEffect(() => {
        getVocab(getToken()).then(list => {
            setBothVocabLists(list);
        })
      }, []);
    
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
            })
            
        }
        
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
                    <Description meaning={meaning} synonymsList={synonymList}/>
                </div>
            </dashboard>
            <Toast/>

        </div>
        


    )
}

