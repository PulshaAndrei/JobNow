import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StatusBar, Platform } from 'react-native';
import { Scene, Router, Actions, ActionConst } from 'react-native-router-flux';
import Drawer from 'react-native-drawer'

import FCM, { FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType } from 'react-native-fcm';

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
import MyOrderProposals from './containers/MyOrders/MyOrderProposals';
import NewJobCategory from './containers/MyOrders/Category';

import MyProposals from './containers/MyProposals';
import OrderDetails from './containers/OrderDetails';
import UserProfile from './containers/UserProfile';
import CreateReview from './containers/UserProfile/CreateReview';

import Settings from './containers/Settings';
import NotificationsSettings from './containers/Settings/NotificationsSettings';
import { loadJob, setFromScreen } from './modules/orderdetails';
import { loadCurrentJob, setCurrentJob } from './modules/myorders';
import { sendFcmToken } from './modules/user';

class App extends Component {
  componentDidMount() {
    FCM.requestPermissions();

    FCM.getInitialNotification().then((notif) => {
      if (Platform.OS === 'android') {
        if (notif.orderId) this.goToNotificationResult(notif);
      } else if (notif && notif.orderId) this.goToNotificationResult(notif);
    });

    this.notificationListener = FCM.on(FCMEvent.Notification, async (notif) => {
      if (Platform.OS === 'android') {
        if (notif.local_notification && !notif.opened_from_tray) return;

        if (notif.opened_from_tray) {
          FCM.removeAllDeliveredNotifications();
          FCM.cancelAllLocalNotifications();
          this.goToNotificationResult(notif);
        } else if (Platform.OS === 'android') {
          FCM.removeAllDeliveredNotifications();
          FCM.cancelAllLocalNotifications();
          FCM.presentLocalNotification({
            title: notif.fcm.title,
            body: notif.fcm.body,
            priority: 'high',
            click_action: notif.click_action,
            show_in_foreground: true,
            local: true,
            orderId: notif.orderId,
            type: notif.type,
          });
        }
      }
      if (Platform.OS === 'ios') {
        if (notif.opened_from_tray) this.goToNotificationResult(notif);
        switch (notif._notificationType) {
          case NotificationType.Remote:
            notif.finish(RemoteNotificationResult.NewData);
            break;
          case NotificationType.NotificationResponse:
            notif.finish();
            break;
          case NotificationType.WillPresent:
            notif.finish(WillPresentNotificationResult.All);
            break;
        }
      }
    });

    this.refreshTokenListener = FCM.on(FCMEvent.RefreshToken, token => this.props.sendFcmToken(token));
  }

  goToNotificationResult(notif) {
    console.warn('notif', notif);
    if (notif.type === 'new_order') {
      Actions.mainNavigationTab();
      this.props.loadJob(notif.orderId);
      this.props.setFromScreen('main');
      Actions.orderDetails();
    } else if (notif.type === 'new_proposal') {
      Actions.myOrdersNavigationTab();
      this.props.setCurrentJob({ id: notif.orderId, bets: [] });
      this.props.loadCurrentJob();
      Actions.myOrderDetails();
    }
  }

  componentWillUnmount() {
    this.notificationListener.remove();
    this.refreshTokenListener.remove();
  }

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
                  <Scene key="orderDetails" component={OrderDetails} />
                  <Scene key="userDetailsByMain" component={UserProfile} />
                  <Scene key="userReviewByMain" component={CreateReview} />
                </Scene>
                <Scene key="profileNavigationTab" hideNavBar>
                  <Scene key="profile" component={Profile} />
                </Scene>
                <Scene key="myOrdersNavigationTab" hideNavBar>
                  <Scene key="orders" component={MyOrders} />
                  <Scene key="createOrder" component={CreateOrder} />
                  <Scene key="myOrderDetails" component={MyOrderDetails} />
                  <Scene key="myOrderProposals" component={MyOrderProposals} />
                  <Scene key="userDetailsByMyOrdersApplications" component={UserProfile} />
                  <Scene key="userReviewByMyOrdersApplications" component={CreateReview} />
                  <Scene key="createOrderCategory" component={NewJobCategory} />
                </Scene>
                <Scene key="myApplicationsNavigationTab" hideNavBar>
                  <Scene key="applications" component={MyProposals} />
                  <Scene key="orderDetailsByProposal" component={OrderDetails} />
                  <Scene key="userDetailsByMyApplication" component={UserProfile} />
                  <Scene key="userReviewByMyApplication" component={CreateReview} />
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

export default connect(
  state => ({}),
  { loadJob, setFromScreen, loadCurrentJob, setCurrentJob, sendFcmToken }
)(App);
