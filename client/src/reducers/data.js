import {
    GET_WADATA,
    INSERT_WADATA,
    WADATA_ERROR,
    DELETE_WADATA,
    GET_TRAINDATA,
    GET_DATA,
    EDIT_DATA,
    WABOT_DATA,
    INSTANCE_SETTING,
    INSERT_SOURCEKEY,
    DELETE_SOURCEKEY,
    ADD_WABOT,
    ERROR_WABOT
} from '../actions/types';
    
const initialState = {
    wadatas : [],
    wadata : null,
    loading: true,
    error: {},
    traindatas : [],
    data : {},
    bots : {}
};

function WaDataReducer(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_WADATA:
            return {
                ...state,
                wadatas: payload,
                loading: false
            };
        case INSERT_WADATA:
            return {
                ...state,
                wadatas: payload,
                loading: false
            };
        case DELETE_WADATA:
            return {
                ...state,
                wadatas: payload,
                loading: false
            };
        case GET_TRAINDATA:
            return {
                ...state,
                traindatas : payload,
                loading : false
            }
        case GET_DATA:
            return {
                ...state,
                data : payload,
                loading : false
            }
        case EDIT_DATA:
            return {
                ...state,
                loading : false
            }
        case WABOT_DATA:
            return {
                ...state,
                bots : payload,
                loading : false
            }
        case INSTANCE_SETTING:
            return {
                ...state,
                loading : false
            }
        case INSERT_SOURCEKEY:
            return {
                ...state,
                loading : false
            }
        case DELETE_SOURCEKEY:
            return {
                ...state,
                loading : false
            }
        case ADD_WABOT:
            return {
                ...state,
                loading : false
            }
    default:
        return state;
    }
}

export default WaDataReducer;
    