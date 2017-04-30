import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from 'react-native-simple-store';
import { Actions } from 'react-native-router-flux';

import { LoginView } from '../../components/Login';
import { getUser } from '../../modules/user';
import { loadSubscribedCategories } from '../../modules/settings';

class InitialPage extends Component {
  componentDidMount() {
    store.get('token').then((token) => {
      if (!token) {
        Actions.login();
      } else {
        this.props.getUser();
        this.props.loadSubscribedCategories();
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
  { getUser, loadSubscribedCategories }
)(InitialPage);
