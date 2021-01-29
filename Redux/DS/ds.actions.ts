import DSActionTypes from "./ds.types";
import { postDSSong } from "../../api"

export const getDSSongs = () => (dispatch: any) => {
    dispatch({
        type: DSActionTypes.GET_DS_SONGS_FETCHING
    });
    postDSSong()
    .then((res) => {
        dispatch({
            type: DSActionTypes.GET_DS_SONGS_SUCCESS,
            payload: res
        });
    })
    .catch((err) => {
        dispatch({
            type: DSActionTypes.GET_DS_SONGS_FAILURE,
            payload: err
        });    
    })
}