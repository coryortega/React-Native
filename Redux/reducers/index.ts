import { combineReducers } from 'redux';
import getTokenReducer from './getTokenReducer';
import getTrackInfo from './getTrackInfoReducer';

export default combineReducers({
    getTokenReducer,
    getTrackInfo
});
