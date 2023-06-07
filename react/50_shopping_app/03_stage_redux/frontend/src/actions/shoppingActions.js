import { loading,stopLoading,logoutFailed } from './loginActions';
import * as actionConstants from './actionConstants';

//ASYNC THUNKS
export const getList = (token,search) => {
    return async (dispatch) => {
        let url = "/api/shopping"
        if(search) {
            url = url + search
        }
        let request = {
            "method":"GET",
            "headers":{
                "token":token
            }
        }
        dispatch(loading());
        const response = await fetch(url,request);
        dispatch(stopLoading());
        if(!response) {
            dispatch(fetchListFailed("Server never responded. Try again later."));
            return;
        }
        if(response.ok) {
            const list = await response.json();
            if(!list) {
                dispatch(fetchListFailed("Failed to parse shopping information. Try again later"));
                return;
            }
            dispatch(fetchListSuccess(list));
        } else {
            if(response.status === 403) {
                dispatch(logoutFailed("Your session has expired. Logging you out."));
                return;
            }
            dispatch(fetchListFailed("Fetching shopping information failed. Server responded with a status "+response.status+" "+response.statusText));
        }
    }
}

//ACTION CREATORS
const fetchListSuccess = (list) => {
    return {
        type:actionConstants.FETCH_LIST_SUCCESS,
        list:list
    }
}

const fetchListFailed = (error) => {
    return {
        type:actionConstants.FETCH_LIST_FAILED,
        error:error
    }
}

const addItemSuccess = () => {
    return {
        type:actionConstants.ADD_ITEM_SUCCESS
    }
}

const addItemFailed = (error) => {
    return {
        type:actionConstants.ADD_ITEM_FAILED,
        error:error
    }
}