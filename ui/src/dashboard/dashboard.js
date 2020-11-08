import {} from '../fetch/fetch';
import './dashboard.css';
import Navbar from './navbar/navbar';
import {getVocab} from '../fetch/fetch';
import {getToken} from '../Authentication/AuthState';
import React, {useState, useEffect} from 'react';
import Cards from './cards/cards';
import Description from './description/description';
import GuyOnComputer from '../svg/guyoncomputer';
import {useSelector, useDispatch} from 'react-redux';
import {addCards} from '../actions/addRemoveCards';


export default function Dashboard(props)
{
    //mutableVocabList can change, for example, when user filter for a word
    //whereas primary reflects the actual list the user has.
    const immutableVocabList = useSelector(state => state.vocabList);
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

    return (
        <div>
            <GuyOnComputer/>
            <dashboard>
                <Navbar/>
                <placeholder className="navbar-placeholder"></placeholder>
                <div className="dashboardMainWindow">
                    <Cards vocabList={mutableVocabList} setMeaning={setMeaning}  
                    filterVocab={filterVocab} setSynonymList={setSynonymList}
                    setBothVocabLists={setBothVocabLists}/>
                    <Description meaning={meaning} synonymsList={synonymList}/>
                </div>
            </dashboard>

        </div>
        


    )
}

