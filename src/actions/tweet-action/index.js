import {
    GET_TWEETS_LOADING, GET_TWEETS_SUCCESS, GET_TWEETS_FAILURE,  
    POST_TWEETS_LOADING, POST_TWEETS_SUCCESS, POST_TWEETS_FAILURE, 
    GET_REPLIES_LOADING, GET_REPLIES_SUCCESS, GET_REPLIES_FAILURE,
} from '../types';

export const getTweets = () => async(dispatch) => {
    console.log('thsis is dispatch get tweets');
    const { name, token } = JSON.parse(localStorage.getItem('userToken'));

    dispatch({type: GET_TWEETS_LOADING, payload: null});
    fetch(`${process.env.REACT_APP_BACKEND_URL}/tweets/get-tweets/${name}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        }
    })
    .then(res => {
        return res.json();
    })
    .then(res => {
        console.log('this is the result in get tweets', res);
        dispatch({type: GET_TWEETS_SUCCESS, payload: res.tweets});
    })
    .catch(err => {
        dispatch({type: GET_TWEETS_FAILURE, payload: err.message});
    });
}

export const postTweets = (data) => async(dispatch) => {
    
    const { token } = JSON.parse(localStorage.getItem('userToken'));
    dispatch({type: POST_TWEETS_LOADING, payload: null});
    fetch(`${process.env.REACT_APP_BACKEND_URL}/tweets/post-tweets`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        },
        body: JSON.stringify(data)
    })
    .then(res => {
        return res.json();
    })
    .then(res => {
        console.log(res.success);
        dispatch({type: POST_TWEETS_SUCCESS, payload: res.success});
    })
    .catch(err => {
        dispatch({type: POST_TWEETS_FAILURE, payload: err.message});
    });
}

export const getReplies = (id, username) => async(dispatch) => {
    const { token } = JSON.parse(localStorage.getItem('userToken'));
    console.log(id, username);
    dispatch({type: GET_REPLIES_LOADING, payload: null});
    fetch(`${process.env.REACT_APP_BACKEND_URL}/tweets/get-replies/${id}/${username}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        }
    })
    .then(res => {
        return res.json();
    })
    .then(res => {
        console.log('replies data', res);
        dispatch({type: GET_REPLIES_SUCCESS, payload: res.tweets});
    })
    .catch(err => {
        dispatch({type: GET_REPLIES_FAILURE, payload: err.message});
    });
}