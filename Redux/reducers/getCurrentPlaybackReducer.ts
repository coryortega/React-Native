import SpotifyActionTypes from '../Spotify/spotify.types';
const initialState = {
    actions: {},
    context: null,
    currently_playing_type: "",
    device: {},
    is_playing: null,
    item: {},
    progress_ms: 0,
    repeat_state: "",
    shuffle_state: null,
    timestamp: 0
  };

const getTrackInfoReducer = (state=initialState, action: any) => {
    switch(action.type) {
    case SpotifyActionTypes.GET_CURRENT_PLAYBACK_FETCHING:
        return {
            ...state,
            ...action.payload
        }
      case SpotifyActionTypes.GET_CURRENT_PLAYBACK_SUCCESS:
        return {
            ...state,
            ...action.payload
        }
      case SpotifyActionTypes.GET_CURRENT_PLAYBACK_FAILURE:
        return {
            ...state,
            ...action.payload
        }
    }
    return state;
}

export default getTrackInfoReducer;