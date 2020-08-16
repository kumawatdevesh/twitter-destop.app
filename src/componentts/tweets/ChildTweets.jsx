import React, { useState } from 'react';
import ParentTweet from './ParentTweet';
import styles from './childTweets.module.css';
const ChildTweets = (props) => {

    const [showParent, setShowParent] = useState(false);
    const [tweetContent, setTweetContent] = useState();

    const { child_tweets } = props;

    const childClickTweetHandler = (data) => {
        console.log(data);
        setTweetContent(data);
        setShowParent(true);
    };

    const closeParentHandler = () => {
        setShowParent(false);
    };

    return (

        <div className={styles.parent__contanier}>
            <div className={styles.child__tweet__contanier}>
                {child_tweets.map(i => {
                    return (
                        <div className={styles.child__tweet__details} key={i.id} onClick={() => childClickTweetHandler(i)}>
                            <div className={styles.child__tweets__profile}>
                                <div className={styles.child__tweets__profile__image}>
                                    <img src={i.user.profile_image_url} alt="users__image" />
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
                        <div className={styles.child__tweet__details} key={i.id} onClick={() => childClickTweetHandler(i)}>
                            <div className={styles.child__tweets__profile}>
                                <div className={styles.child__tweets__profile__image}>
                                    <img src={i.user.profile_image_url} alt="users__image" />
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
            {showParent && <ParentTweet tweet={tweetContent} closeParentHandler={closeParentHandler} />}
        </div>
    )
};

export default ChildTweets;