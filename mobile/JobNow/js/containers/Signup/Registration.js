import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import { Container, DescriptionTitle } from '../../components/Common';
import { SignupScrollView, NextButton, FirstName, LastName, PhoneDisabled, Email, PickerConnection } from '../../components/Signup';
//import { login } from './state';

class Registration extends Component {
  state = {
    activationCode: '',
  }
  render() {
    return (
      <Container>
        <SignupScrollView>
          <DescriptionTitle>Персональные данные</DescriptionTitle>
          <FirstName />
          <LastName />
          <DescriptionTitle>Контактные данные</DescriptionTitle>
          <PhoneDisabled />
          <Email />
          <DescriptionTitle>Предпочитаемый способ связи</DescriptionTitle>
          <PickerConnection />
          <NextButton onPress={Actions.registration} />
        </SignupScrollView>
      </Container>
    );
  }
}

export default connect(
  state => ({},
    { /*login*/ }
  )
)(Registration);
