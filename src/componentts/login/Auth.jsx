import React from 'react';
import TwitterLogin from "react-twitter-login";
import * as actioncreators from '../../actions/signin-action/index';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import styles from './Auth.module.css';

const Auth = (props) => {

    const authHandler = (err, data) => {
        console.log(data, err);
        if(data) {
            props.signIn(data.screen_name, data.user_id);
        }
    };

    const signInUser = () => {
        const { getSignInReducers } = props;
        if(getSignInReducers.loading) {
            return <h1>Loading ...</h1>
        }else if(getSignInReducers.success.ok) {
            const { token, user: { name } } = getSignInReducers.success.data;
            localStorage.setItem('userToken', JSON.stringify({token: token, name}));
            return props.history.push('/tweets');
        }else if(getSignInReducers.failure.error) {
            return <h1>{getSignInReducers.failure.msg}</h1>
        }
    };  

    return (
        <div className={styles.container}>
            <TwitterLogin
                className={styles.login__button}
                authCallback={authHandler}
                consumerKey={`${process.env.REACT_APP_CONSUMER_KEY}`}
                consumerSecret={`${process.env.REACT_APP_CONSUMER_SECRET}`}
                callbackUrl={`${process.env.REACT_APP_CALLBACK_URL}`}
            />
            {signInUser()}
        </div>
    );
};

const mapStateToProps = ({ signInReducers }) => {

    const { signin: { post: getSignInReducers }} = signInReducers;
    return {
        getSignInReducers
    }
};

const mapStateToDispatch = dispatch => {
    return {
        signIn: (name, user_id) => dispatch(actioncreators.postSignIn(name, user_id))
    }
};

export default withRouter(connect(mapStateToProps, mapStateToDispatch)(Auth));