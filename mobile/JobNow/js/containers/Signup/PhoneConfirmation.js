import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import {Keyboard} from 'react-native';

import { Container, DescriptionTitle, LoadingIndiactor } from '../../components/Common';
import { SignupView, NextButton, ActivationCode } from '../../components/Signup';
import { confirmActivation } from '../../modules/user';

class PhoneConfirmation extends Component {
  state = {
    activationCode: '',
  }
  confirm() {
    Keyboard.dismiss();
    this.props.confirmActivation(this.props.phone, this.state.activationCode);
  }
  render() {
    return (
      <Container>
        <SignupView>
          <DescriptionTitle>На Ваш телефон в течении 10 минут придёт СМС-сообщение с кодом подтверждения</DescriptionTitle>
          <ActivationCode value={this.state.activationCode} setValue={(value) => this.setState({ activationCode: value })} />
          <NextButton onPress={() => this.confirm()} />
        </SignupView>
        <LoadingIndiactor visible={this.props.isLoading} />
      </Container>
    );
  }
}

export default connect(
  state => ({
    isLoading: state.user.isLoading,
    phone: state.user.phone,
  }),
  { confirmActivation }
)(PhoneConfirmation);
