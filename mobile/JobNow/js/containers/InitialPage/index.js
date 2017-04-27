import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from 'react-native-simple-store';
import { Actions } from 'react-native-router-flux';

import { LoginView } from '../../components/Login';
import { getUser } from '../../modules/user';

class InitialPage extends Component {
  componentDidMount() {
    store.get('token').then((token) => {
      if (!token) {
        Actions.login();
      } else {
        this.props.getUser();
        Actions.drawer();
      }
    });
  }

  render() {
    return (
      <LoginView />
    );
  }
}

export default connect(
  state => ({}),
  { getUser }
)(InitialPage);
