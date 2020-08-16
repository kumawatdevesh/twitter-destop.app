import {GET_TWEETS_LOADING, GET_TWEETS_SUCCESS, GET_TWEETS_FAILURE, GET_TWEETS_RESET, POST_TWEETS_LOADING, POST_TWEETS_SUCCESS, POST_TWEETS_FAILURE} from '../types';

export const getTweets = () => async(dispatch) => {
    const userToken = JSON.parse(localStorage.getItem('userToken'));
    dispatch({type: GET_TWEETS_LOADING, payload: null});
    fetch('http://localhost:5000/api/tweets/get-tweets', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + userToken
        }
    })
    .then(res => {
        return res.json();
    })
    .then(res => {
        dispatch({type: GET_TWEETS_SUCCESS, payload: res.tweets});
    })
    .catch(err => {
        dispatch({type: GET_TWEETS_FAILURE, payload: err.message});
    });
}

export const postTweets = (data) => async(dispatch) => {
    const userToken = JSON.parse(localStorage.getItem('userToken'));
    dispatch({type: POST_TWEETS_LOADING, payload: null});
    fetch('http://localhost:5000/api/tweets/post-tweets', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + userToken
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