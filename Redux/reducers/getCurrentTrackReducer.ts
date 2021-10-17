import SpotifyActionTypes from '../Spotify/spotify.types';
const initialState = {
    timestamp: 0,
    context: null,
    progress_ms: 0,
    device: {},
    is_playing: null,
    currently_playing_type: "track",
    item: {},
  };

const getCurrentTrackInfoReducer = (state=initialState, action: any) => {
    switch(action.type) {
    case SpotifyActionTypes.GET_CURRENT_TRACK_FETCHING:
        return {
            ...state,
            ...action.payload
        }
      case SpotifyActionTypes.GET_CURRENT_TRACK_SUCCESS:
        return {
            ...state,
            ...action.payload
        }
      case SpotifyActionTypes.GET_CURRENT_TRACK_FAILURE:
        return {
            ...state,
            ...action.payload
        }
    }
    return state;
}

export default getCurrentTrackInfoReducer;