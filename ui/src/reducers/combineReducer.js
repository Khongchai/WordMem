import {combineReducers} from 'redux';
import allowDelete from './allowDeleteReducer';
import currentlySelectedWord from './currentlySelectedWord';
import cardHistory from './cardHistory';


const allReducers = combineReducers({
    allowDelete,
    currentlySelectedWord,
    cardHistory
});

export default allReducers;