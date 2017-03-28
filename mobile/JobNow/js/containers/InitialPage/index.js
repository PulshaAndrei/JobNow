import React, { Component } from 'react';
import { View,Text } from 'react-native';
import store from 'react-native-simple-store';
import { Actions } from 'react-native-router-flux';

import { LoginView } from '../../components/Login';

export default class InitialPage extends Component {
  componentDidMount() {
    store.get('token').then((token) => {
      if (!token) {
        Actions.login();
      } else {
        Actions.main();
      }
    });
  }

  render() {
    return (
      <LoginView />
    );
  }
}
