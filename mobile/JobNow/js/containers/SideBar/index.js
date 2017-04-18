import React, { Component } from 'react';
import Drawer from 'react-native-drawer';
import {Actions, DefaultRenderer} from 'react-native-router-flux';

import { SideMenu } from '../../components/SideMenu';

export default class NavigationDrawer extends Component {
  state = {
    currentItem: 0,
  }

  render(){
    const menuButtons = [
      {
        title: "Поиск заказов",
        onPress: async () => {
          this.setState({ currentItem: 0 });
          await Actions.mainNavigationTab();
          Actions.refresh({key:state.key, open: false});
        },
      },
      {
        title: "Профиль",
        onPress:  async () => {
          this.setState({ currentItem: 1 });
          await Actions.profileNavigationTab();
          Actions.refresh({key:state.key, open: false});
        },
      },
      {
        title: "Мои заказы",
        onPress:  async () => {
          this.setState({ currentItem: 2 });
          await Actions.myOrdersNavigationTab();
          Actions.refresh({key:state.key, open: false});
        },
      },
      {
        title: "Мои отклики",
        onPress:  async () => {
          this.setState({ currentItem: 3 });
          await Actions.myApplicationsNavigationTab();
          Actions.refresh({key:state.key, open: false});
        },
      },
      {
        title: "Настройки",
        onPress:  async () => {
          this.setState({ currentItem: 4 });
          await Actions.settingsNavigationTab();
          Actions.refresh({key:state.key, open: false});
        },
      }
    ];

    const state = this.props.navigationState;
    const children = state.children;
    return (
      <Drawer
        ref="navigation"
        open={state.open}
        onOpen={()=>Actions.refresh({key:state.key, open: true})}
        onClose={()=>Actions.refresh({key:state.key, open: false})}
        type="displace"
        content={<SideMenu
          onClose={()=>Actions.refresh({key:state.key, open: false})}
          menuButtons={menuButtons}
          currentItem={this.state.currentItem}
        />}
        styles={{
          drawer: {shadowColor: '#000000', shadowOpacity: 1, shadowRadius: 3, elevation: 15},
          mainOverlay: { backgroundColor: 'black', opacity: 0 }
        }}
        tapToClose={true}
        openDrawerOffset={0.2}
        panCloseMask={0.2}
        negotiatePan={true}
        tweenHandler={(ratio) => ({ mainOverlay: { opacity: ratio / 2 }})}
      >
        <DefaultRenderer navigationState={children[0]} onNavigate={this.props.onNavigate} />
      </Drawer>
    );
  }
}
