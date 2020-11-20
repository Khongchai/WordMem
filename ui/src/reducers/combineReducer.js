import {combineReducers} from 'redux';
import vocabList from './cardReducer';
import allowDelete from './allowDeleteReducer';


const allReducers = combineReducers({
    vocabList,
    allowDelete
});

export default allReducers;