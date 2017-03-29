import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import { Scene, Router, Actions } from 'react-native-router-flux';

import InitialPage from './containers/InitialPage'

import Login from './containers/Login';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render = () => {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" /*backgroundColor="#01162b"*/ />
        <Router getSceneStyle={() => ({ /*backgroundColor: "#01162b"*/ })}>
          <Scene key="root">

            <Scene key="initial" component={InitialPage} hideNavBar type="replace" initial />

            <Scene key="login" component={Login} hideNavBar type="replace" />

          </Scene>
        </Router>
      </View>
    );
  }
}

export default App;
