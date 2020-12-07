import {combineReducers} from 'redux';
import vocabList from './cardReducer';
import allowDelete from './allowDeleteReducer';
import currentlySelectedWord from './currentlySelectedWord';
import cardHistory from './cardHistory';


const allReducers = combineReducers({
    vocabList,
    allowDelete,
    currentlySelectedWord,
    cardHistory
});

export default allReducers;