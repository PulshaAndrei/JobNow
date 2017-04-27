import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Keyboard } from 'react-native';

import { Container, DescriptionTitle, LoadingIndiactor } from '../../components/Common';
import { SignupScrollView, NextButton, FirstName, LastName, PhoneDisabled, Email, PickerConnection, Password } from '../../components/Signup';
import { registration } from '../../modules/user';

class Registration extends Component {
  state = {
    givenName: '',
    familyName: '',
    email: '',
    communicationMethod: 0,
    password: '',
  }
  registration() {
    Keyboard.dismiss();
    this.props.registration({
      ...this.state,
      phone: this.props.phone.replace(/\D/g,''),
      confirmationCode: this.props.confirmationCode,
    });
  }
  render() {
    return (
      <Container>
        <SignupScrollView>
          <DescriptionTitle>Персональные данные</DescriptionTitle>
          <FirstName value={this.state.givenName} setValue={(value) => this.setState({ givenName: value })} />
          <LastName value={this.state.familyName} setValue={(value) => this.setState({ familyName: value })} />
          <Password value={this.state.password} setValue={(value) => this.setState({ password: value })} />
          <DescriptionTitle>Контактные данные</DescriptionTitle>
          <PhoneDisabled value={this.props.phone} />
          <Email value={this.state.email} setValue={(value) => this.setState({ email: value })} />
          <DescriptionTitle>Предпочитаемый способ связи</DescriptionTitle>
          <PickerConnection value={this.state.communicationMethod} setValue={(value) => this.setState({ communicationMethod: value })} />
          <NextButton onPress={() => this.registration()} />
        </SignupScrollView>
        <LoadingIndiactor visible={this.props.isLoading} />
      </Container>
    );
  }
}

export default connect(
  state => ({
    isLoading: state.user.isLoading,
    phone: state.user.phone,
    confirmationCode: state.user.confirmationCode,
  }),
  { registration }
)(Registration);
