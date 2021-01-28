import SpotifyActionTypes from "./spotify.types";
import { fetchTokenAsync, getAudioInfo } from "../../api"


export const getUserToken = (code: string) => (dispatch: any) => {
    dispatch({
      type: SpotifyActionTypes.GET_TOKEN_FETCHING
    });
    fetchTokenAsync(code)
        .then((res) => {
            console.log("res in spotify.actions", res)
            dispatch({
                type: SpotifyActionTypes.GET_TOKEN_SUCCESS,
                payload: res.data
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
    console.log("gettin track info");
    dispatch({
        type: SpotifyActionTypes.GET_TRACK_INFO_FETCHING
    });
    getAudioInfo(trackId)
    .then((res) => {
        console.log("res in spotify.actions", res)
        dispatch({
            type: SpotifyActionTypes.GET_TOKEN_SUCCESS,
            payload: res.data
        });
    })
    .catch((err) => {
        dispatch({
            type: SpotifyActionTypes.GET_TOKEN_FAILURE,
            payload: err
        });    
    })
}