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
import MainFilter from './containers/Main/MainFilter';

import Profile from './containers/Profile';

import MyOrders from './containers/MyOrders';
import CreateOrder from './containers/MyOrders/CreateOrder';
import MyOrderDetails from './containers/MyOrders/MyOrderDetails';

import MyProposals from './containers/MyProposals';
import OrederDetails from './containers/OrderDetails';

import Settings from './containers/Settings';
import NotificationsSettings from './containers/Settings/NotificationsSettings';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render = () => {
    return (
      <View style={{ flex: 1, backgroundColor: "#01162b" }}>
        <StatusBar barStyle="light-content" translucent backgroundColor="rgba(12,29,46,0.5)" />
        <Router>
          <Scene key="root" getSceneStyle={() => ({ backgroundColor: "#01162b" })}>

            <Scene key="initial" component={InitialPage} hideNavBar type="replace" initial />

            <Scene key="login" component={Login} hideNavBar type="replace" />
            <Scene key="signup" navBar={Header} title="Регистрация" getSceneStyle={() => ({ backgroundColor: "#01162b" })}>
              <Scene key="phoneNumber" component={PhoneNumber} />
              <Scene key="phoneConfirmation" component={PhoneConfirmation} />
              <Scene key="registration" component={Registration} />
            </Scene>

            <Scene key="drawer" component={NavigationDrawer} open={false} type="replace" >
              <Scene key="drawerWrapper" tabs={true}>
                <Scene key="mainNavigationTab" hideNavBar>
                  <Scene key="main" component={Main} />
                  <Scene key="mainFilter" component={MainFilter} />
                </Scene>
                <Scene key="profileNavigationTab" hideNavBar>
                  <Scene key="profile" component={Profile} />
                </Scene>
                <Scene key="myOrdersNavigationTab" hideNavBar>
                  <Scene key="orders" component={MyOrders} />
                  <Scene key="createOrder" component={CreateOrder} />
                  <Scene key="myOrderDetails" component={MyOrderDetails} />
                </Scene>
                <Scene key="myApplicationsNavigationTab" hideNavBar>
                  <Scene key="applications" component={MyProposals} />
                  <Scene key="orderDetailsByProposal" component={OrederDetails} />
                </Scene>
                <Scene key="settingsNavigationTab" hideNavBar>
                  <Scene key="settings" component={Settings} />
                  <Scene key="notificationsSettings" component={NotificationsSettings} />
                </Scene>
              </Scene>
            </Scene>

          </Scene>
        </Router>
      </View>
    );
  }
}

export default App;
