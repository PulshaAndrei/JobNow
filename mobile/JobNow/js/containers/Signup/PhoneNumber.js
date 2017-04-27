import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import {Keyboard} from 'react-native';

import { Container, DescriptionTitle, LoadingIndiactor } from '../../components/Common';
import { SignupView, NextButton, PhoneInput } from '../../components/Signup';
import { phoneMask, sendSms } from '../../modules/user';

class PhoneNumber extends Component {
  state = {
    phone: '',
  }
  sendSms() {
    Keyboard.dismiss();
    this.props.sendSms(this.state.phone);
  }
  render() {
    return (
      <Container>
        <SignupView>
          <DescriptionTitle>Введите Ваш номер телефона</DescriptionTitle>
          <PhoneInput
            value={this.state.phone}
            setValue={(value) => this.setState({ phone: phoneMask(value) })}
            onFocus={() => this.setState({ phone: this.state.phone || '+375 ' })}
          />
          <NextButton onPress={() => this.sendSms() } />
        </SignupView>
        <LoadingIndiactor visible={this.props.isLoading} />
      </Container>
    );
  }
}

export default connect(
  state => ({
    isLoading: state.user.isLoading,
    phoneMask
  }),
  { sendSms }
)(PhoneNumber);
