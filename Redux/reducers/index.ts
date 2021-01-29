import { combineReducers } from 'redux';
import getTokenReducer from './getTokenReducer';
import getTrackInfoReducer from './getTrackInfoReducer';
import getDSSongsReducer from './getDSSongsReducer';

export default combineReducers({
    getTokenReducer,
    getTrackInfoReducer,
    getDSSongsReducer
});
