import {} from '../fetch/fetch';
import './dashboard.css';
import Navbar from './navbar/navbar';
import {getVocab} from '../fetch/fetch';
import {getToken} from '../Authentication/AuthState';
import React, {useState, useEffect} from 'react';
import Cards from './cards/cards';
import Description from './description/description';
import Addcard from './cards/addcard';


export default function Dashboard(props)
{
    const [vocabList, setVocabList] = useState('');
    const [meaning, setMeaning] = useState('')

    useEffect(() => {
        getVocab(getToken()).then(vocab => {
            setVocabList(vocab);
        })
      }, []);

    return (
        <dashboard>
            <Navbar vocabList={vocabList}/>
            <div className="navbar-placeholder"></div>
            <div className="dashboardMainWindow">
                <Cards vocabList={vocabList} setMeaning={setMeaning} />
                <Addcard/>
                <Description meaning={meaning}/>
            </div>

            

        </dashboard>
        //Log out button here
    )
}