import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import Private from './components/Private';

export default function RouterComponent() {
  return (
    <Router sceneStyle={{ paddingTop: 65 }}>
    <Scene key="auth">
      <Scene key="login" component={LoginForm} title="Please login" />
    </Scene>

    <Scene key="main">
      <Scene key="private" component={Private} title="Private" />
    </Scene>
    </Router>
  );
}
