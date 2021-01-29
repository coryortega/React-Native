import DSActionTypes from '../DS/ds.types'
const initialState = {

  };

const getTrackInfoReducer = (state=initialState, action: any) => {
    switch(action.type) {
    case DSActionTypes.GET_DS_SONGS_FETCHING:
        return {
            ...state,
            ...action.payload
        }
      case DSActionTypes.GET_DS_SONGS_SUCCESS:
        return {
            ...state,
            ...action.payload
        }
      case DSActionTypes.GET_DS_SONGS_FAILURE:
        return {
            ...state,
            ...action.payload
        }
    }
    return state;
}

export default getTrackInfoReducer;