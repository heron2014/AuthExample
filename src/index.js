import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Provider } from 'react-redux';
import {createStore } from 'redux';
import rootReducer from './redux';
import firebase from 'firebase';
import LoginForm from './components/LoginForm';

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
    return (
      <Provider store={createStore(rootReducer)}>
        <LoginForm />
      </Provider>
    );
  }
}
