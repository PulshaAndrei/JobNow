import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import {Keyboard} from 'react-native';

import { Container, DescriptionTitle } from '../../components/Common';
import { SignupView, NextButton, PhoneInput } from '../../components/Signup';
import { phoneMask } from '../../modules/user';

class PhoneNumber extends Component {
  state = {
    phone: '',
  }
  sendSms() {
    Keyboard.dismiss();
    Actions.phoneConfirmation();
  }
  render() {
    return (
      <Container>
        <SignupView>
          <DescriptionTitle>Введите Ваш номер телефона</DescriptionTitle>
          <PhoneInput
            value={this.state.phone}
            setValue={(value) => this.setState({ phone: phoneMask(value) })}
            onFocus={() => this.setState({ phone: '+375 ' })}
          />
          <NextButton onPress={() => this.sendSms() } />
        </SignupView>
      </Container>
    );
  }
}

export default connect(
  state => ({},
    { phoneMask }
  )
)(PhoneNumber);
