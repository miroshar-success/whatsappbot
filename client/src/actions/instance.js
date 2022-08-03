import api from '../utils/api';
import { setAlert } from './alert';
import {
    DELETE_INSTANE,
    DELETE_POST,
    GET_INSTANCE,
    GET_KEYWORD,
    GET_LOGS,
    GET_MESSAGETASK,
    INSTANCE_ERROR,
    INSTANCE_SETTING,
    INSTERT_INSTANCE,
    MAKE_PUBLIC,
    SET_MESSAGE,
    SET_WEBHOOK
} from './types';
import {message} from 'antd';

export const getInstances = () => async (dispatch) => {
    try {
        const res = await api.post("/instances/getinstances");
        dispatch({
            type : GET_INSTANCE,
            payload : res.data
        })
        // message.success("Success!")

    } catch (error) {
        dispatch({
            type : INSTANCE_ERROR
        })
    }
}

export const editSetting = (formdata) => async (dispatch) => {
    try {
        const res = await api.post("/instances/setinstances",formdata);
        dispatch({
            type : INSTANCE_SETTING,
            payload : res.data
        })
        message.success("Success!")

    } catch (error) {
        dispatch({
            type : INSTANCE_ERROR
        })       
    }
}

export const getKeyWord = (instance_id,id) => async (dispatch) => {
    try {
        const res = await api.post("/instances/getkeyword",{instance_id,id});
        dispatch({
            type : GET_KEYWORD,
            payload : res.data
        })
        // message.success("Success!")

    } catch (error) {
        dispatch({
            type : INSTANCE_ERROR
        })        
    }
}

export const deleteKeyWord = (id) => async (dispatch) => {
    try {
        const res = await api.post("/instances/deletekeyword",{id});
        dispatch({
            type : DELETE_POST
        });
        message.success("Success!")

    } catch (error) {
        dispatch({
            type : INSTANCE_ERROR
        })
    }
}

export const setWebhook = (instance_id) => async (dispatch) => {
    try {
        const res = await api.post("/instances/setwebhook",{instance_id});
        dispatch({
            type : SET_WEBHOOK,
        })
        message.success("Success!")

    } catch (error) {
        dispatch({
            type : INSTANCE_ERROR
        })
    }
}

export const storeMessageTask = (formdata) => async (dispatch) => {
    try {
        const res = await api.post("/instances/storeMessageTask",formdata);
        dispatch({
            type : SET_MESSAGE
        })
        dispatch(getMessageTask(formdata.instance_id));
        dispatch(getLogs(formdata.instance_id));
        message.success("Success!")

    } catch (error) {
        dispatch({
            type : INSTANCE_ERROR
        })
    }
}
 
export const getMessageTask = (instance_id) => async (dispatch) => {
    try {
        const res = await api.post("/instances/getMessageTask",{instance_id});
        dispatch({
            type : GET_MESSAGETASK,
            payload : res.data
        })
        message.success("Success!")

    } catch (error) {
        dispatch({
            type : INSTANCE_ERROR
        })
    }
}

export const getLogs = (instance_id) => async (dispatch) => {
    try {
        const res = await api.post("/instances/getLogs",{instance_id});
        console.log(res,"logS");
        dispatch({
            type : GET_LOGS,
            payload : res.data
        })

        // message.success("Success!")

    } catch (error) {
        dispatch({
            type : INSTANCE_ERROR
        })
    }
}

export const deleteInstance = (instance_id) => async (dispatch) => {
    try {
        const res = await api.post("/instances/deleteInstance",{instance_id});
        dispatch({
            type : DELETE_INSTANE
        })
        message.success("Success!")

    } catch (error) {
        dispatch({
            type : INSTANCE_ERROR
        })
    }
}

export const makePublic = (instance_id) => async (dispatch) => {
    try {
        const res = await api.post("/instances/makePublicorPrivate",{instance_id});
        dispatch({
            type : MAKE_PUBLIC
        })
        dispatch(getInstances(instance_id))
        message.success("Success!")

    } catch (error) {
        
        dispatch({
            type : INSTANCE_ERROR
        })
        message.error("Error!")

    }
}

export const insertInstance = (formdata) => async (dispatch) => {
    try {
        const res = await api.post("/instances/insertInstance",formdata);
        dispatch({
            type : INSTERT_INSTANCE
        })
        message.success("Success!")

    } catch (error) {
        dispatch({
            type : INSTANCE_ERROR
        })
        message.success("Error!")

    }
}