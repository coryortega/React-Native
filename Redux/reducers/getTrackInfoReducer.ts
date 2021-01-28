import SpotifyActionTypes from '../Spotify/spotify.types'
const initialState = {
    acousticness: 0,
    analysis_url: "",
    danceability: 0,
    duration_ms: 0,
    energy: 0,
    id: "",
    instrumentalness: 0,
    key: 0,
    liveness: 0,
    loudness: 0,
    mode: 0,
    speechiness: 0,
    tempo: 0,
    time_signature: 0,
    track_href: "",
    type: "",
    uri: "",
    valence: 0.428
  };

const getTrackInfoReducer = (state=initialState, action: any) => {
    switch(action.type) {
    case SpotifyActionTypes.GET_TRACK_INFO_FETCHING:
        return {
            ...state,
            ...action.payload
        }
      case SpotifyActionTypes.GET_TRACK_INFO_SUCCESS:
        return {
            ...state,
            ...action.payload
        }
      case SpotifyActionTypes.GET_TRACK_INFO_FAILURE:
        return {
            ...state,
            ...action.payload
        }
    }
    return state;
}

export default getTrackInfoReducer;