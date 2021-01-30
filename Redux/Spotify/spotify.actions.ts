import SpotifyActionTypes from "./spotify.types";
import { fetchTokenAsync, getAudioInfo, getCurrentPlaybackState } from "../../api"


export const getUserToken = (code: string) => (dispatch: any) => {
    dispatch({
      type: SpotifyActionTypes.GET_TOKEN_FETCHING
    });
    fetchTokenAsync(code)
        .then((res) => {
            dispatch({
                type: SpotifyActionTypes.GET_TOKEN_SUCCESS,
                payload: res
            });
        })
        .catch((err) => {
            dispatch({
                type: SpotifyActionTypes.GET_TOKEN_FAILURE,
                payload: err
            });    
        })
  };

export function logOut(dispatch: any) {
    dispatch({
        type: SpotifyActionTypes.LOGOUT_FETCHING
    });
}

export const getTrackInfo = (trackId: string) => (dispatch: any) => {
    dispatch({
        type: SpotifyActionTypes.GET_TRACK_INFO_FETCHING
    });
    getAudioInfo(trackId)
    .then((res) => {
        dispatch({
            type: SpotifyActionTypes.GET_TRACK_INFO_SUCCESS,
            payload: res
        });
    })
    .catch((err) => {
        dispatch({
            type: SpotifyActionTypes.GET_TRACK_INFO_FAILURE,
            payload: err
        });    
    })
}

export const getCurrentPlayback = () => (dispatch: any) => {
    dispatch({
        type: SpotifyActionTypes.GET_CURRENT_PLAYBACK_FETCHING
    });
    getCurrentPlaybackState()
    .then((res) => {
        dispatch({
            type: SpotifyActionTypes.GET_CURRENT_PLAYBACK_SUCCESS,
            payload: res
        });
    })
    .catch((err) => {
        dispatch({
            type: SpotifyActionTypes.GET_CURRENT_PLAYBACK_FAILURE,
            payload: err
        });    
    })
}