import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import { Container, DescriptionTitle } from '../../components/Common';
import { SignupView, NextButton, PhoneInput } from '../../components/Signup';
//import { login } from './state';

class PhoneNumber extends Component {
  state = {
    phone: '',
    password: '',
  }
  render() {
    return (
      <Container>
        <SignupView>
          <DescriptionTitle>Введите Ваш номер телефона</DescriptionTitle>
          <PhoneInput />
          <NextButton onPress={Actions.phoneConfirmation} />
        </SignupView>
      </Container>
    );
  }
}

export default connect(
  state => ({},
    { /*login*/ }
  )
)(PhoneNumber);
