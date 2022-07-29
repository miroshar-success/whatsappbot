import {
  EDIT_USER,
  GET_USER,
    GET_USERS,
    INSERT_USER,
    USER_ERROR
  } from '../actions/types';
  
  const initialState = {
    user : null,
    users : [],
    loading: true,
    error: {},
    currentuser : {}
  };
  
  function UserReducer(state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
        case GET_USERS:
            return {
                ...state,
                users: payload,
                loading: false
            };
        case USER_ERROR:
            return {
                ...state,
                error: payload,
                loading: false,
                users: []
            };
        case INSERT_USER:
          return {
            ...state,
            loading : false,
            users : payload
          }
        case GET_USER:
          return {
            ...state,
            loading : false,
            currentuser : payload
          }
        case EDIT_USER:
          return {
            ...state,
            loading : false,
            users : payload
          }
      default:
        return state;
    }
  }
  
  export default UserReducer;
  