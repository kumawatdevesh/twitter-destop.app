import {POST_SIGNIN_LOADING, POST_SIGNIN_SUCCESS, POST_SIGNIN_FAILURE } from '../types';

export const postSignIn = (name, user_id) => async(dispatch) => {
    dispatch({type: POST_SIGNIN_LOADING, payload: null});
    fetch(`${process.env.REACT_APP_BACKEND_URL}/users/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: name, user_id: user_id})
    })
    .then(res => {
        return res.json();
    })
    .then(res => { 
        dispatch({type: POST_SIGNIN_SUCCESS, payload: res});
    })
    .catch(err => {
        dispatch({type: POST_SIGNIN_FAILURE, payload: err.message});
    });
}