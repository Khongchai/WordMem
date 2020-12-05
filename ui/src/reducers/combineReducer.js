import {combineReducers} from 'redux';
import vocabList from './cardReducer';
import allowDelete from './allowDeleteReducer';
import currentlySelectedWord from './currentlySelectedWord';


const allReducers = combineReducers({
    vocabList,
    allowDelete,
    currentlySelectedWord
});

export default allReducers;