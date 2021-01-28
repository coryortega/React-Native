import SpotifyActionTypes from '../Spotify/spotify.types'
const initialState = {};

const getTrackInfoReducer = (state=initialState, action: any) => {
    console.log(action.payload)

    switch(action.type) {
    case SpotifyActionTypes.GET_TRACK_INFO_FETCHING:
        console.log("this is fetching", action.payload)
        return {
            ...state,
            ...action.payload
        }
      case SpotifyActionTypes.GET_TRACK_INFO_SUCCESS:
        console.log("this is sucess", action.payload)
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