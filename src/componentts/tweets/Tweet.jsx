import React, { useEffect, useState } from 'react';
import ChildTweets from './ChildTweets';
import Header from './Header';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styles from './Tweet.module.css';
import * as actionReducers from '../../actions/tweet-action/index';

const Tweet = (props) => {

    useEffect(() => {
        props.getTweets();
    }, []);

    const renderTweets = () => {
        const { getTweetReducers } = props;
        if(getTweetReducers.loading) {
            return <h1>Loading ...</h1>
        }else if(getTweetReducers.success.ok) {
            if(getTweetReducers.success.data.length === 0) {
                window.location.reload();
            }
            return <ChildTweets child_tweets={getTweetReducers.success.data} />
        }else if(getTweetReducers.failure.error) {
            return <h1>{getTweetReducers.failure.msg}</h1>
        }
    };      
    // console.log('this is main tweet', props.getTweetReducers);
    return (
        <div className={styles.container}>
            <Header />
            {renderTweets()}
        </div>
    );  
};  

const mapStateToProps = ({ tweetReducers }) => {

    const { tweet: { get: getTweetReducers } } = tweetReducers;
    return {
        getTweetReducers
    }
};

const mapStateToDispatch = dispatch => {
    return {
        getTweets: () => dispatch(actionReducers.getTweets())
    }
};

export default withRouter(connect(mapStateToProps, mapStateToDispatch)(Tweet));