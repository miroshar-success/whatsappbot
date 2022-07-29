import api from '../utils/api';
import { setAlert } from './alert';
import {
  GET_USERS,
  INSERT_USER,
  USER_ERROR,
  EDIT_USER,
  GET_USER
} from './types';

// Load all users
export const getUsers = () => async (dispatch) => {
    try{
        const res = await api.post("/users/getallusers");
        dispatch({
            type: GET_USERS,
            payload: res.data
          });
    }catch{
        dispatch({
            type : USER_ERROR
        })
    }
}

export const insertUser = (formdata) => async (dispatch) => {
    try{
        const res = await api.post("/users/insertuser",formdata);
        dispatch({
            type : INSERT_USER,
            payload : res.data
        })
    }catch{
        dispatch({
            type : USER_ERROR
        })
    }
}

export const editUser = (formdata) => async (dispatch) => {
    try{
        const res = await api.post("/users/edituser",formdata);
        dispatch({
            type : EDIT_USER,
            payload : res.data
        })
    }catch{
        dispatch({
            type : USER_ERROR
        })
    }
}

export const getUser = (email) => async (dispatch) => {
    try {
        const res = await api.post("/users/getuser",{email});
        dispatch({
            type : GET_USER,
            payload : res.data
        })
    } catch (error) {
        dispatch({
            type : USER_ERROR
        })
    }
}