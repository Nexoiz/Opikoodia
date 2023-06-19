import * as actionConstants from '../types/actionConstants';
import User from '../models/User';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

interface Token {
    token:string
}

//ASYNC THUNKS

export const register = (user:User) => {

}

export const login = (user:User) => {

}

export const logout = (user:User) => {

}

const handleLogin = async (request:Request,act:string,dispatch:ThunkDispatch<any,any,AnyAction>) => {

}

//ACTION CREATORS

export const loading = () => {
    return {
        type:actionConstants.LOADING
    }
}

export const stopLoading = () => {
    return {
        type:actionConstants.STOP_LOADING
    }
}

export const registerSuccess = () => {
    return {
        type:actionConstants.REGISTER_SUCCESS
    }
}

export const registerFailed = (error:string) => {
    return {
        type:actionConstants.REGISTER_FAILED,
        error:error
    }
}

const logoutSuccess = () => {
    return {
        type:actionConstants.LOGOUT_SUCCESS
    }
}

export const logoutFailed = (error:string) => {
    return {
        type:actionConstants.LOGOUT_FAILED,
        error:error
    }
}

const setUsername = (user:string) => {
    return {
        type:actionConstants.SET_USERNAME,
        user:user
    }
}