import { combineReducers } from 'redux';
import getTokenReducer from './getTokenReducer';
import getTrackInfoReducer from './getTrackInfoReducer';
import getDSSongsReducer from './getDSSongsReducer';
import getCurrentPlaybackReducer from './getCurrentPlaybackReducer';

export default combineReducers({
    getTokenReducer,
    getTrackInfoReducer,
    getDSSongsReducer,
    getCurrentPlaybackReducer
});
