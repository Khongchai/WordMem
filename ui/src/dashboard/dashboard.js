import {} from '../fetch/fetch';
import './dashboard.css';
import Navbar from './navbar/navbar';
import {getVocab} from '../fetch/fetch';
import {getToken} from '../Authentication/AuthState';
import React, {useState, useEffect} from 'react';
import Cards from './cards/cards';


export default function Dashboard(props)
{
    const [vocabList, setVocabList] = useState(0);

    useEffect(() => {
        getVocab(getToken()).then(vocab => {
            setVocabList(vocab);
        })
      }, []);

    return (
        <dashboard>
            <Navbar vocabList={vocabList}/>
            <div className="dashboardMainWindow">
                <Cards vocabList={vocabList} />
            </div>
        </dashboard>
        //Log out button here
    )
}