import React, { useState, useEffect } from 'react';
import ParentTweet from './ParentTweet';
import * as actionCreators from '../../actions/tweet-action/index';
import styles from './childTweets.module.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const ChildTweets = (props) => {

    const [showParent, setShowParent] = useState(false);
    const [thread, setThread] = useState();

    const { child_tweets } = props;

    const childClickTweetHandler = (data) => {
        setShowParent(true);
        setThread(data);
        props.getReplies(data.id_str, data.user.screen_name);
    };

    const closeParentHandler = () => {
        setShowParent(false);
    };

    return (

        <div className={styles.child__parent__contanier}>
            <div className={styles.child__tweet__contanier}>
                {child_tweets.map(i => {
                    return (
                        <div className={styles.child__tweet__details} key={i._id} onClick={() => childClickTweetHandler(i)}>
                            <div className={styles.child__tweets__profile}>
                                <div className={styles.child__tweets__profile__image}>
                                    <img src={i.user.image_url} alt="users__image" />
                                </div>
                                <div className={styles.twitter__user__details}>
                                    <span>{i.user.name}</span>
                                    <p>{i.text}</p> 
                                </div>
                                <div className={styles.tweet__no__icon}>
                                    <p>online</p>
                                </div>
                            </div>
                        </div>
                    )
                })}
                <div className={styles.divider}>
                    <h2><span>Expired chats</span></h2>
                </div>
                {child_tweets.map(i => {
                    return (
                        <div className={styles.child__tweet__details} key={i._id} onClick={() => childClickTweetHandler(i)}>
                            <div className={styles.child__tweets__profile}>
                                <div className={styles.child__tweets__profile__image}>
                                    <img src={i.user.image_url} alt="users__image" />
                                </div>
                                <div className={styles.twitter__user__details}>
                                    <span>{i.user.name}</span>
                                    <p>{i.text}</p> 
                                </div>
                                <div className={styles.tweet__no__icon}>
                                    <p>online</p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            {showParent && <ParentTweet tweet={thread} closeParentHandler={closeParentHandler} />}
        </div>
    )
};

const mapDispatchToProps = dispatch => {
    return {
        getReplies: (id, username) => dispatch(actionCreators.getReplies(id, username))
    }
}

export default withRouter(connect(null, mapDispatchToProps)(ChildTweets)); 