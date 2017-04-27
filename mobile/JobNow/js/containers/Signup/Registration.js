import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import { Container, DescriptionTitle, LoadingIndiactor } from '../../components/Common';
import { SignupScrollView, NextButton, FirstName, LastName, PhoneDisabled, Email, PickerConnection } from '../../components/Signup';
//import { login } from './state';

class Registration extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    connection: 0,
  }
  render() {
    return (
      <Container>
        <SignupScrollView>
          <DescriptionTitle>Персональные данные</DescriptionTitle>
          <FirstName value={this.state.firstName} setValue={(value) => this.setState({ firstName: value })} />
          <LastName value={this.state.lastName} setValue={(value) => this.setState({ lastName: value })} />
          <DescriptionTitle>Контактные данные</DescriptionTitle>
          <PhoneDisabled value={this.props.phone} />
          <Email value={this.state.email} setValue={(value) => this.setState({ email: value })} />
          <DescriptionTitle>Предпочитаемый способ связи</DescriptionTitle>
          <PickerConnection value={this.state.connection} setValue={(value) => this.setState({ connection: value })} />
          <NextButton onPress={Actions.registration} />
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
  }),
  { /*login*/ }
)(Registration);
