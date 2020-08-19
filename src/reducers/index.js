import { combineReducers } from 'redux';
import signInReducers from './signin-reducers/index';
import tweetReducers from './tweet-reducers/index';
import repliesReducers from './replies-reducers/index';

export default combineReducers({
    signInReducers,
    tweetReducers,
    repliesReducers
});