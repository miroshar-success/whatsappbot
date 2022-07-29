import {
    INSTANCE_ERROR,
    GET_INSTANCE,
    INSTANCE_SETTING,
    GET_KEYWORD,
    SET_WEBHOOK,
    DELETE_POST,
    SET_MESSAGE,
    GET_MESSAGETASK,
    GET_LOGS,
    DELETE_INSTANE,
    INSTERT_INSTANCE,
    MAKE_PUBLIC
} from '../actions/types';

const initialState = {
    instance : null,
    instances : [],
    loading: true,
    error: {},
    currentinstance : {},
    keyword : {},
    task : {},
    logs : []
};

function InstanceReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_INSTANCE:
            return {
                ...state,
                instances: payload,
                loading: false
            };
        case INSTANCE_SETTING:
            return {
                ...state,
                loading: false
            };
        case GET_KEYWORD:
            return {
                ...state,
                keyword : payload,
                loading : false
            }
        case SET_WEBHOOK:
            return {
                ...state,
                loading : false
            }
        case DELETE_POST:
            return {
                ...state,
                loading : false
            }
        case SET_MESSAGE : 
            return {
                ...state,
                loading : false
            }
        case GET_MESSAGETASK :
            return {
                ...state,
                loading : false,
                task : payload
            }
        case GET_LOGS:
            return {
                ...state,
                loading : false,
                logs : payload
            }
        case DELETE_INSTANE: 
            return {
                ...state,
                loading : false
            }
        case INSTERT_INSTANCE:
            return {
                ...state,
                loading : false
            }
        case MAKE_PUBLIC:
            return {
                ...state,
                loading : false
            }
    default:
        return state;
    }
}

export default InstanceReducer;
    