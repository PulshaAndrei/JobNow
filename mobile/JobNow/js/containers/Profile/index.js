import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import { Container, SwitchItem, InputItem } from '../../components/Common';
import { ProfileView, ProfileHeader } from '../../components/Profile';

class Profile extends Component {
  render() {
    return (
      <Container>
        <ProfileView>
          <ProfileHeader
            onMenu={() => Actions.refresh({key: 'drawer', open: true })}
            onFilter={Actions.mainFilter}
          />
          <InputItem title="Имя" value="Иван" setValue={() => {}} />
          <InputItem title="Фамилия" value="Иванов" setValue={() => {}} />
          <InputItem title="Номер телефона" value="+375 (44) 579 8272" disavled />
          <SwitchItem title="Телефон виден всем" value={true} setValue={() => {}} />
          <InputItem title="E-mail" value="ivan@ivanov.by" setValue={() => {}} keyboardType="email-address" />
        </ProfileView>
      </Container>
    );
  }
}

export default connect(
  state => ({},
    { /*login*/ }
  )
)(Profile);
