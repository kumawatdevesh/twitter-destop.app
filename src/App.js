import React, { useEffect, useState, Suspense } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import { connect } from 'react-redux';

const Auth = React.lazy(() => import('./componentts/login/Auth'));
const Tweet = React.lazy(() => import('./componentts/tweets/Tweet'));

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
      <main><Suspense fallback={<div>Loading...</div>}>{routes}</Suspense></main>
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
