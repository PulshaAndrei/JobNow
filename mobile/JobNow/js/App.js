import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import { Scene, Router, Actions, ActionConst } from 'react-native-router-flux';
import Drawer from 'react-native-drawer'

import InitialPage from './containers/InitialPage';

import { Header } from './components/Header';

import NavigationDrawer from './containers/SideBar';

import Login from './containers/Login';
import PhoneNumber from './containers/Signup/PhoneNumber';
import PhoneConfirmation from './containers/Signup/PhoneConfirmation';
import Registration from './containers/Signup/Registration';

import Main from './containers/Main';

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

            <Scene key="drawer" component={NavigationDrawer} open={false} type="replace" >
              <Scene key="drawerWrapper" tabs={true} >
                <Scene key="main" component={Main} hideNavBar />
                <Scene key="registrationM" component={Registration} hideNavBar />
              </Scene>
            </Scene>

          </Scene>
        </Router>
      </View>
    );
  }
}

export default App;
