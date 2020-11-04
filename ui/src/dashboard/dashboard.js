import {} from '../fetch/fetch';
import './dashboard.css';
import Navbar from './navbar/navbar';
import {getVocab} from '../fetch/fetch';
import {getToken} from '../Authentication/AuthState';
import React, {useState, useEffect} from 'react';
import Cards from './cards/cards';
import Description from './description/description';
import Addcard from './cards/addcard';
import GuyOnComputer from '../svg/guyoncomputer';


export default function Dashboard(props)
{
    const [vocabList, setVocabList] = useState('');
    const [vocabListForReset, setVocabListForReset] = useState('');
    const [meaning, setMeaning] = useState('');


    useEffect(() => {
        getVocab(getToken()).then(vocab => {
            setVocabList(vocab);
            //secondary list for retrieval of the original 
            //value should something happen to the first
            setVocabListForReset(vocab);
        })
      }, []);
    
    function filterVocab(filteredArray)
    {
        setVocabList(filteredArray);
    }

    return (
        <div>
            <GuyOnComputer/>
            <dashboard>
                <Navbar vocabList={vocabListForReset}/>
                <placeholder className="navbar-placeholder"></placeholder>
                <div className="dashboardMainWindow">
                    <Cards vocabList={vocabList} setMeaning={setMeaning} setVocabList={setVocabList} 
                    filterVocab={filterVocab} vocabListForReset={vocabListForReset}/>
                    <Description meaning={meaning}/>
                </div>
            </dashboard>

        </div>
        


    )
}

