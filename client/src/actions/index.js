import {
        SIGN_IN,
        SIGN_OUT,
        FETCH_STREAMS,
        FETCH_STREAM,
        CREATE_STREAM,
        EDIT_STREAM,
        DELETE_STREAM
       } 
       from './type';
import stream from '../apis/stream';
import history from '../history'

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


// there maybe typos.
export const fetchStreams = ()=>{
    return async (dispatch)=>{
        const response = await stream.get('/streams');
        dispatch({
            type:FETCH_STREAMS,
            payload: response.data
        })
    }
}

export const fetchStream = (id)=>{
    return async (dispatch)=>{
        const response = await stream.get(`/streams/${id}`);
        //console.log(response);
        dispatch({
            type:FETCH_STREAM,
            payload: response.data
        })
    }
}
export const createStream =  formValues =>{
    console.log(formValues);
    return async (dispatch, getState)=>{
        const authorID = getState().auth.currentUserId;
        const response = await stream.post('/streams',{...formValues, authorID});
        dispatch({
            type:CREATE_STREAM,
            payload: response.data
        })

        history.push('/');
    }
}

export const editStream = (id, formValues) =>{
    return async (dispatch)=>{
        const response = await stream.patch(`/streams/${id}`,formValues);
        dispatch({
            type:EDIT_STREAM,
            payload:response.data
        });

        history.push('/');
    }
}

export const deleteStream = (id) =>{
    return async(dispatch)=>{
        await stream.delete(`/streams/:${id}`);
        dispatch({
            type:DELETE_STREAM
        })
    }
}
