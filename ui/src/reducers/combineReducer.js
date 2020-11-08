import {combineReducers} from 'redux';
import vocabCards from './cardReducer';


const allReducers = combineReducers({
    vocabCards
});

export default allReducers;