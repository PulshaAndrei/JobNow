import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import { Container, DescriptionTitle } from '../../components/Common';
import { SignupView, NextButton, ActivationCode } from '../../components/Signup';
//import { login } from './state';

class PhoneConfirmation extends Component {
  state = {
    activationCode: '',
  }
  render() {
    return (
      <Container>
        <SignupView>
          <DescriptionTitle>На Ваш телефон в течении 10 минут придёт СМС-сообщение с кодом подтверждения</DescriptionTitle>
          <ActivationCode />
          <NextButton onPress={Actions.registration} />
        </SignupView>
      </Container>
    );
  }
}

export default connect(
  state => ({},
    { /*login*/ }
  )
)(PhoneConfirmation);
