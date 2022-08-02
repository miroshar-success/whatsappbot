import api from '../utils/api';
import { setAlert } from './alert';
import {
  GET_WADATA,INSERT_WADATA,WADATA_ERROR,DELETE_WADATA, GET_TRAINDATA, TRAIN_ERROR, GET_DATA, DATA_ERROR, EDIT_DATA, WABOT_DATA, INSTANCE_SETTING, INSERT_SOURCEKEY, DELETE_SOURCEKEY, UPDATE_WABOT, ADD_WABOT, ERROR_WABOT
} from './types';
import {message} from 'antd';

export const getWadata = () => async (dispatch) => {
    try {
        const res = await api.post("/datas/getwadata");
        dispatch({
            type : GET_WADATA,
            payload : res.data
        })
        // message.success("Success!")
    } catch (error) {
        dispatch({
            type : WADATA_ERROR
        })
        message.error("Failed!")

    }
}

export const insertWadata = (formdata) => async (dispatch) => {
    try {
        const res = await api.post("/datas/insertwadata",formdata);
        dispatch({
            type : INSERT_WADATA,
            payload : res.data
        })
        message.success("Success!")
    } catch (error) {
        dispatch({
            type : WADATA_ERROR
        })        
        message.error("Failed!")

    }

}

export const deleteWadata = (_ID) => async (dispatch) => {
    try {
        const res = await api.post("/datas/deletewadata",{_ID});
        dispatch({
            type : DELETE_WADATA,
            payload : res.data
        })
        message.success("Success!")
    } catch (error) {
        dispatch({
            type : WADATA_ERROR
        })      
        message.error("Success!")

    }
}

export const getTrainData = (_in_id) => async (dispatch) => {
    try {
        const res = await api.post("/datas/gettraindata",{in_id : _in_id * 1});
        dispatch({
            type : GET_TRAINDATA,
            payload : res.data
        })
        message.success("Success!")

    } catch (error) {
        dispatch({
            type : TRAIN_ERROR
        })
        message.success("Error!")

    }
}

export const getData = (id) => async (dispatch) => {
    try {
        const res = await api.post("/datas/getdata",{id});
        dispatch({
            type : GET_DATA,
            payload : res.data
        })
        message.success("Success!")

    } catch (error) {
        dispatch({
            type : DATA_ERROR
        })
        message.error("Error!")

    }
}

export const editData = (formdata) => async (dispatch) => {
    try {
        const res = await api.post("/datas/editdata",formdata);
        dispatch({
            type : EDIT_DATA,
            payload : res.data
        })
        message.success("Success!")

    } catch (error) {
        dispatch({
            type : DATA_ERROR
        })
        message.error("Error!")

    }
}

export const getBotsByInstance = (instance_id) => async (dispatch) => {
    try {
        const res = await api.post("/datas/getbotbyinstance",{instance_id});
        dispatch({
            type : WABOT_DATA,
            payload : res.data
        })
        message.success("Success!")

    } catch (error) {
        dispatch({
            type : DATA_ERROR
        })      
        message.error("Error!")

    }
}

export const setBotsByInstance = (formdata) => async (dispatch) => {
    try {
        const res = await api.post("/datas/storebot",formdata);
        dispatch({
            type : INSTANCE_SETTING,
        })
        message.success("Success!")
    } catch (error) {
        dispatch({
            type : DATA_ERROR
        })
        message.error("Error!")

    }
}

export const insertSourceKey = (formdata) => async (dispatch) => {
    try {
        const res = await api.post("/datas/storesourcekeywords",formdata);
        dispatch({
            type : INSERT_SOURCEKEY
        })
        message.success("Success!")

    } catch (error) {
        dispatch({
            type : DATA_ERROR
        })
        message.error("Error!")


    }
}

export const deleteSourceKey = (id) => async (dispatch) => {
    try {
        const res = await api.post("/datas/deletesourcekey",{id});
        dispatch({
            type : DELETE_SOURCEKEY
        })
        message.success("Success!")

    } catch (error) {
        dispatch({
            type : DATA_ERROR
        })
        message.error("Error!")

    }
}

export const updateWabot = (formdata) => async (dispatch) => {
    try {
        const res = await api.post("/datas/updatewabot",formdata);
        dispatch({
            type : UPDATE_WABOT
        })
        message.success("Success!")

    } catch (error) {
        dispatch({
            type : DATA_ERROR
        })
        message.error("Error!")

    }
}

export const addWabot = (formdata) => async (dispatch) => {
    try {
        const res = await api.post("/datas/addwabot",formdata);
        dispatch({
            type : ADD_WABOT
        })
        dispatch(getBotsByInstance(formdata.instance_id));
        message.success("Success!")
    } catch (error) {
        dispatch({
            type : ERROR_WABOT
        })
    }
}