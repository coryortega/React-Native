import DSActionTypes from "./ds.types";
import { postDSSong, getTracks } from "../../api"

export const getDSSongs = () => (dispatch: any) => {
    dispatch({
        type: DSActionTypes.GET_DS_SONGS_FETCHING
    });
    //getting 20 song ID's from DS endpoint
    postDSSong()
    .then((res) => {
        const songs = res.songs;
        const songIds = songs.map(song => song.values).join(",");

        //passing song ID's to Spotify, to return more detailed track info for each song
        getTracks(songIds)
        .then((tracks) => {
            dispatch({
                type: DSActionTypes.GET_DS_SONGS_SUCCESS,
                payload: tracks.tracks
            });
        })
        .catch((err) => {
            dispatch({
                type: DSActionTypes.GET_DS_SONGS_FAILURE,
                payload: err
            });  
        })
    })
    .catch((err) => {
        dispatch({
            type: DSActionTypes.GET_DS_SONGS_FAILURE,
            payload: err
        });    
    })
}