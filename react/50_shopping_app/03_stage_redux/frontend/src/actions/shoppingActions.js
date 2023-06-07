import { loading,stopLoading,logoutFailed } from './loginActions';
import * as actionConstants from './actionConstants';

//ASYNC THUNKS

//ACTION CREATORS
const fetchListSuccess = (list) => {
    return {
        type:actionConstants.FETCH_LIST_SUCCESS,
        list:list
    }
}

const fetchListFailed = (list) => {
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