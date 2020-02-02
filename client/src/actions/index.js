import React from 'react';
import {SIGN_IN,SIGN_OUT} from './type';

export const SignIn = userId=>{
    return {
        type: SIGN_IN,
        payload: userId
    }
}

export const SignOut = ()=>{
    return {
        type:SIGN_OUT
    }
}