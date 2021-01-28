const initialState = {
    token: {},
    currentUserFetching: false,
    err: ''
}

const getTokenReducer = (state=initialState, action: any) => {
    switch(action.type) {
    case 'GET_TOKEN_FETCHING':
        return{
            ...state,
            currentUserFetching: true
        }
      case 'GET_TOKEN_SUCESS':
        return{
            ...state,
            token: action.payload,
            currentUserFetching: false
        }
      case 'GET_TOKEN_FAILURE':
        return{
            ...state,
            error: action.payload
        }
    }
    return state;
}

export default getTokenReducer;