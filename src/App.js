import React, { useEffect, useState } from 'react';
import Auth from './componentts/login/Auth';
import Tweet from './componentts/tweets/Tweet';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import { connect } from 'react-redux';

function App(props) {

  const[userToken, setUserToken] = useState();

  let routes;

  useEffect(() => {
      setUserToken(props.getSignInReducers.success.data || JSON.parse(localStorage.getItem('userToken')));
  }, [props.getSignInReducers.success]);

  if(userToken) {
    routes = (
        <Switch>
          <Route path="/tweets" component={Tweet} />
          <Route path="*" component={Auth} />
        </Switch>
      )
    }else {
      routes = (
        <Switch>
          <Route exact path="/" exact component={Auth} />
          <Route path="*" component={Auth} />
        </Switch>
      )
  }

  return (
    <BrowserRouter>
      {routes}
    </BrowserRouter>
  );
}

const mapStateToProps = ({ signInReducers }) => {

  const { signin: { post: getSignInReducers }} = signInReducers;
  return {
      getSignInReducers
  }
};

export default connect(mapStateToProps, null)(App);
