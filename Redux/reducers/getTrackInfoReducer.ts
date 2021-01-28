const initialState = {};

const getTrackInfoReducer = (state=initialState, action: any) => {
    switch(action.type) {
    case 'GET_TRACK_INFO_FETCHING':
        return{
            ...state,
            currentUserFetching: true
        }
      case 'GET_TRACK_INFO_SUCESS':
        return{
            ...state,
            token: action.payload,
            currentUserFetching: false
        }
      case 'GET_TRACK_INFO_FAILURE':
        return{
            ...state,
            error: action.payload
        }
    }
    return state;
}

export default getTrackInfoReducer;