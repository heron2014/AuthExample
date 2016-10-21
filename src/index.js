import React, { Component } from 'react';
import { Provider } from 'react-redux';
import {createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './redux';
import firebase from 'firebase';
import Router from './Router';

export default class App extends Component {
  componentWillMount() {
    // Initialize Firebase - it can only run one time!
     const config = {
       apiKey: 'AIzaSyA-YUVxpJDe6ESBqE0h18MJsuaah-O2OKQ',
       authDomain: 'authexample-3354a.firebaseapp.com',
       databaseURL: 'https://authexample-3354a.firebaseio.com',
       storageBucket: 'authexample-3354a.appspot.com',
       messagingSenderId: '293037288767'
     };
     firebase.initializeApp(config);
  }

  render() {
    const store = createStore(rootReducer, {}, applyMiddleware(thunk))
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}
