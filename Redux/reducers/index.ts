import { combineReducers } from 'redux';
import getTokenReducer from './getTokenReducer';
import getTrackInfoReducer from './getTrackInfoReducer';

export default combineReducers({
    getTokenReducer,
    getTrackInfoReducer
});
