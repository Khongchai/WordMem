import {combineReducers} from 'redux';
import vocabList from './cardReducer';


const allReducers = combineReducers({
    vocabList
});

export default allReducers;