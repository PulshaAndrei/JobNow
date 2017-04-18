import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import { Container } from '../../components/Common';
import { SettingsView, SettingsHeader, SettingButton, LogoutButton } from '../../components/Settings';

class Settings extends Component {
  render() {
    return (
      <Container>
        <SettingsView>
          <SettingsHeader
            onMenu={() => Actions.refresh({key: 'drawer', open: true })}
            onFilter={Actions.mainFilter}
          />
          <SettingButton title="Уведомления" onPress={Actions.notifications}/>
          <SettingButton title="Справка и поддержка" onPress={Actions.support}/>
          <SettingButton title="Контакты" onPress={Actions.support}/>
          <LogoutButton onPress={() => {}} />
        </SettingsView>
      </Container>
    );
  }
}

export default connect(
  state => ({},
    { /*login*/ }
  )
)(Settings);
