import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import { Scene, Router, Actions } from 'react-native-router-flux';

import InitialPage from './containers/InitialPage';

import { Header } from './components/Header';

import Login from './containers/Login';
import PhoneNumber from './containers/Signup/PhoneNumber';
import PhoneConfirmation from './containers/Signup/PhoneConfirmation';
import Registration from './containers/Signup/Registration';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render = () => {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" translucent backgroundColor="rgba(12,29,46,0.5)" />
        <Router getSceneStyle={() => ({ /*backgroundColor: "#01162b"*/ })}>
          <Scene key="root">

            <Scene key="initial" component={InitialPage} hideNavBar type="replace" initial />

            <Scene key="login" component={Login} hideNavBar type="replace" />
            <Scene key="signup" navBar={Header} title="Регистрация">
              <Scene key="phoneNumber" component={PhoneNumber} />
              <Scene key="phoneConfirmation" component={PhoneConfirmation} />
              <Scene key="registration" component={Registration} />
            </Scene>

          </Scene>
        </Router>
      </View>
    );
  }
}

export default App;
