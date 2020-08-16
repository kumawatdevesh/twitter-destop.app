import React from 'react';
import TwitterLogin from "react-twitter-login";
import * as actioncreators from '../../actions/signin-action/index';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import styles from './Auth.module.css';

const Auth = (props) => {

    const authHandler = (err, data) => {
        props.signIn(data.screen_name, data.user_id);
    };

    const signInUser = () => {
        const { getSignInReducers } = props;
        if(getSignInReducers.loading) {
            return <h1>Loading ...</h1>
        }else if(getSignInReducers.success.ok) {
            const { token } = getSignInReducers.success.data;
            localStorage.setItem('userToken', JSON.stringify(token));
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
                consumerKey={'GOeke9UqbAzWwnFAoC79ZuDMT'}
                consumerSecret={'sxUJWFIwceYOlvjWjKB3CAOthhlQPLjJf5hr6orKWzDULg5KQ7'}
                callbackUrl={'http://localhost:3000/'}
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