import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhoneAlt, faEnvelope, faAngleDown, faCalendar, faTimes, faUpload, faCircle } from '@fortawesome/free-solid-svg-icons';
import styles from './ParentTweet.module.css';
import * as actionCreators from '../../actions/tweet-action/index';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import getRepliesReducers from '../../reducers/replies-reducers';

const ParentTweet = (props) => {

    const [postTweet, setPostTweet] = useState('');
    const [thread, setThread] = useState([]);

    const { tweet } = props;

    useEffect(() => {
        const { getRepliesReducers } = props;
        console.log(getRepliesReducers.success.data);
        // setThread([...thread, ...getRepliesReducers.success.data]);
    }, []);

    const replyToUser = (e, id, name) => {
        e.preventDefault();
        const data = {
            id: id.toString(),
            name: name,
            msg: postTweet
        }
        console.log(typeof id);
        props.postTweet(data); 
        setPostTweet(''); 
    };

    const closeParentTweethandler = () => {
        props.closeParentHandler();
    };
    
    return (
        <>
            <div className={styles.parent__tweet__container}>
                <div className={styles.tweet__details}>
                    <div className={styles.tweet__details__header}>
                        <div className={styles.user__details}>
                            <img src={tweet.user.image_url} />
                            <span>{tweet.user.screen_name}</span>
                            <FontAwesomeIcon style={{color: 'green', margin: '0 0.5rem'}} className={styles.status__icon} icon={faCircle} /> 
                        </div> 
                        <div className={styles.tweet__room}>
                            <p>Room: 102</p>
                        </div> 
                        <div className={styles.tweet__dates}>
                            <p>Oct1 - Oct2</p>
                        </div> 
                        <div className={styles.user__details}>
                            <a href="/" className={styles.task__button}>Create a task</a>
                        </div>  
                    </div>
                    <div className={styles.main__tweet__placeholder}>
                        <p>Today</p>
                        {thread && thread.map(i => {
                            return <div key={tweet.image_url} className={styles.main__tweet__placeholder__tweets}>
                                <div className={styles.main__tweet__placeholder__tweets__profile}>
                                    <img src={tweet.user.image_url} /> 
                                </div>
                                <div className={styles.main__tweet__placeholder__tweets__tweet}>
                                    <p>{tweet.name}</p>
                                    <p>{tweet.text}</p>
                                    <div className={styles.main__tweet__placeholder__tweets__tweet__image}>
                                        {/* <img src={require('../assets/user.jpeg')} />  */}
                                    </div>
                                </div>
                                <div className={styles.main__tweet__placeholder__tweets__time}>
                                    <p>10:35</p>
                                </div>
                            </div>
                        })}  
                    </div>
                    <div className={styles.reply__container}>
                        <img src={tweet.user.image_url} />
                        <form onSubmit={(e) => replyToUser(e, tweet.id_str, tweet.user.screen_name)}>
                            <input type="text" value={postTweet} placeholder="Reply..." onChange={(e) => setPostTweet(e.target.value)} />
             
                            {/* <input type="submit" /> */}
                            <input type="file" name="file" />
                            <label className={styles.upload__button}>
                                <FontAwesomeIcon icon={faUpload} />
                            </label>
                        </form>
                    </div>
                </div>
                <div className={styles.tweet__user__details}>
                    <div className={styles.cancel} onClick={closeParentTweethandler}>
                        <p><FontAwesomeIcon icon={faTimes} /></p>
                    </div>
                    <div className={styles.user__details__contanier}>
                        <div className={styles.tweet__user__details__profile}>
                            <div className={styles.tweet__user__details__profile__container}>
                                <img src={tweet.user.image_url} />
                                <p className={styles.name}>{tweet.user.name}</p>
                                <p className={styles.status}>online</p>
                            </div>
                            <div className={styles.contact__details}>
                                <a href="/" className={styles.phone__details}> 
                                    <FontAwesomeIcon icon={faPhoneAlt} /> Call
                                </a>
                                <a href="/" className={styles.email__details}> 
                                    <FontAwesomeIcon icon={faEnvelope} /> Email
                                </a>
                            </div>
                            <div className={styles.extra__details}>
                                <div className={styles.room__details}>
                                    <p>Room</p>
                                    <p>102</p>
                                </div>
                                <div className={styles.category__details}>
                                    <p>Category</p>
                                    <p>Standard</p>
                                </div>
                                <div className={styles.country__details}>
                                    <p>Country</p>
                                    <p>{tweet.user.location}</p>
                                </div>  
                            </div>
                        </div>
                    </div>
                    <div className={styles.task__details}>
                        <div className={styles.task__header}>
                            <p>Tasks</p>
                            <p><FontAwesomeIcon icon={faAngleDown} /></p>
                        </div>
                        <div className={styles.tasks}>
                            <div className={styles.tasks__task}>
                                <p className={styles.tasks__task__icon}><FontAwesomeIcon icon={faCalendar} /></p>
                                <p className={styles.tasks__task__primary}>Clean up room</p>
                            </div>
                            <div className={styles.tasks__task}>
                                <p className={styles.tasks__task__icon}><FontAwesomeIcon icon={faCalendar} /></p>
                                <p className={styles.tasks__task__primary}>Change linen and towels when guests are out</p>
                            </div>
                            <div className={styles.tasks__task}>
                                <p className={styles.tasks__task__icon}><FontAwesomeIcon icon={faCalendar} /></p>
                                <p className={styles.tasks__task__primary}>Bring complementary bottle of red wine</p>
                            </div>
                        </div>
                        <div className={styles.tasks__primary__heading}>
                            <p>ALL TASKS</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

const mapStateToProps = ({ repliesReducers }) => {

    const { replies: { get: getRepliesReducers } } = repliesReducers;
    return {
        getRepliesReducers
    }
};

const mapDispatchToProps = dispatch => {
    return {
        postTweet: (data) => dispatch(actionCreators.postTweets(data))
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ParentTweet));

